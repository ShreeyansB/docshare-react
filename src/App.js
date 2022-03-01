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

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
