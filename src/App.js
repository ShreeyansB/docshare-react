import Auth from "./Auth";
import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Account from "./Account";
import Header from "./header/Header";
import theme from "./theme";

// Font Imports
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Header />
      {/* {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )} */}
    </ChakraProvider>
  );
}

export default App;
