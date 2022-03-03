import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/header/Header";
import theme from "./theme";

// Font Imports
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import Home from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import About from "./components/about/About";
import Error from "./components/error/Error";
import { supabase } from "./supabaseClient";
import { AuthProvider } from "./contexts/Auth";
import AccountSettings from "./components/account/AccountSettings";
import { ProtectedComp } from "./helpers/ProtectedComp";


function App() {
  console.log(supabase.auth.user());

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} exact />
          <Route path="/about" element={<About />} />
          <Route
            path="/account"
            element={
              <ProtectedComp Component={AccountSettings}/>
            }
          />
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
