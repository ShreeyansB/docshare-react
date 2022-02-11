import React from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const HomeForm = ({ isLogin }) => {
  if (isLogin) {
    return <SignUpForm />;
  } else {
    return <LoginForm />;
  }
};

export default HomeForm;
