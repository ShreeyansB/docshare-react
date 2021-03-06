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
import { Route, Routes, useLocation } from "react-router-dom";
import Error from "./components/error/Error";
import { AuthProvider } from "./contexts/Auth";
import { ProtectedComp } from "./helpers/ProtectedComp";
import Docs from "./components/docs/Docs";
import { DBProvider } from "./contexts/Database";
import Download from "./components/docs/download/Download";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const titleMap = [
    { path: "/download", title: "Docshare | Download" },
    { path: "/docs", title: "Docshare | Dashboard" },
    { path: "/", title: "DocShare" },
  ];

  const [pageTitle, setPageTitle] = useState("DocShare");

  const curLoc = useLocation();

  useEffect(() => {
    const curTitle = titleMap.find((item) =>
      curLoc.pathname.includes(item.path)
    );
    if (curTitle && curTitle.title) {
      setPageTitle(curTitle.title);
      document.title = curTitle.title;
    }
  }, [curLoc]);

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
            <Route
              path="/docs"
              element={<ProtectedComp Component={Docs} toRoute="/" />}
            />
            <Route path="/download/:id" element={<Download />} />
          </Routes>
        </DBProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
