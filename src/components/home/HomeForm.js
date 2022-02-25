import React from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { Box } from "@chakra-ui/react";

const HomeForm = ({ isLogin }) => {
  return (
    <Box maxW="40rem">
      {!isLogin && <SignUpForm />}
      {isLogin && <LoginForm />}
    </Box>
  );
};

export default HomeForm;
