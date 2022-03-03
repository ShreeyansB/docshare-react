import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";


export const ProtectedComp = ({Component}) => {
  const { user } = useAuth();

  return user ? <Component /> : <Navigate to="/" />
}