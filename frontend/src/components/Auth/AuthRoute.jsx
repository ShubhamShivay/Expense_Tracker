import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const AuthRoute = ({ children }) => {
  const toke = getUserFromStorage();

  if (toke?.token) {
    //! if user is Logged in then it will render the children component except login/register page

    return children;

  } else {
    return <Navigate to="/login" />;
  }
};

//! if user is Logged in then it will render the children component except login/register page



export default AuthRoute;
