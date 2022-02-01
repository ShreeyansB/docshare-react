import Auth from "./Auth";
import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Account from "./Account";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ChakraProvider>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </ChakraProvider>
  );
}

export default App;
