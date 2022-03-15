import { SHA256 } from "crypto-js";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { supabase } from "./../supabaseClient";

const DBContext = React.createContext();

export function DBProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [reloadCtr, setReloadCtr] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const ufData = await supabase.from("userfiles").select();
      setUserData(ufData.data);
      setIsLoading(false);
    };

    fetchData().catch(console.error);
  }, [reloadCtr]);

  const value = {
    userData: userData,
    insertUserFiles: async (input) => {
      const storageResponse = await supabase.storage
        .from("files")
        .upload(supabase.auth.user().id + "/" + input.filePath, input.file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (storageResponse.error) return { ...storageResponse, pee: "poo" };

      let passcodeEnc = SHA256(input.passcode).toString();
      const { data, error } = await supabase.from("userfiles").insert([
        {
          user_id: supabase.auth.user().id,
          name: input.filePath,
          passcode: input.passcode === "" ? null : passcodeEnc,
        },
      ]);
      setReloadCtr((prev) => prev + 1);
      return { data, error };
    },
    isLoading: isLoading,
    reload: () => setReloadCtr((prev) => prev + 1),
  };

  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
}

export function useDB() {
  return useContext(DBContext);
}
