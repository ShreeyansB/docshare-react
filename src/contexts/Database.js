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

    // Insert Document
    insertUserFiles: async (input) => {
      const storageResponse = await supabase.storage
        .from("files")
        .upload(supabase.auth.user().id + "/" + input.filePath, input.file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (storageResponse.error) return { ...storageResponse };
      let passcodeEnc = SHA256(input.passcode).toString();
      const { data, error } = await supabase.from("userfiles").insert([
        {
          user_id: supabase.auth.user().id,
          name: input.filePath,
          passcode: input.passcode === "" ? null : passcodeEnc,
          size: input.file.size,
          url: storageResponse.data.Key,
        },
      ]);
      setReloadCtr((prev) => prev + 1);
      return { data, error };
    },

    // State var to show loading
    isLoading: isLoading,

    // State var to trigger re-render
    reload: () => setReloadCtr((prev) => prev + 1),

    // Delete File
    deleteFile: async (file) => {
      const dbResponse = await supabase
        .from("userfiles")
        .delete()
        .match({ id: file.id });

      if (dbResponse.error) return { ...dbResponse };

      const storageResponse = await supabase.storage
        .from("files")
        .remove([file.url.split("files/")[1]]);
      setReloadCtr((prev) => prev + 1);
      return { ...storageResponse };
    },

    // Change File Passcode
    changePasscode: async (id, passcode) => {
      let passcodeEnc = SHA256(passcode).toString();
      const { data, error } = await supabase
        .from("userfiles")
        .update({ passcode: passcode === "" ? passcode : passcodeEnc })
        .match({ id: id });
      setReloadCtr((prev) => prev + 1);
      return { data, error };
    },
  };

  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
}

export function useDB() {
  return useContext(DBContext);
}
