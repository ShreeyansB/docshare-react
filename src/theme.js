import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
});

export default theme;
