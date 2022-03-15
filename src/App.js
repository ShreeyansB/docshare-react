import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/header/Header";
import theme from "./theme";

// Font Imports
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import Home from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import About from "./components/about/About";
import Error from "./components/error/Error";
import { AuthProvider } from "./contexts/Auth";
import { ProtectedComp } from "./helpers/ProtectedComp";
import Docs from "./components/docs/Docs";
import { DBProvider } from "./contexts/Database";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <DBProvider>
          <Header />
          <Routes>
            <Route path="*" element={<Error />} />
            <Route
              path="/"
              element={
                <ProtectedComp Component={Home} toRoute="/docs" invert={true} />
              }
              exact
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/docs"
              element={<ProtectedComp Component={Docs} toRoute="/" />}
            />
          </Routes>
        </DBProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
