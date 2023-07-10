import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../services/auth-service";

const Restricted = () => {
  const userLogged = AuthService.isLogged();

  return (
    <>{userLogged ? <div>Restricted route!</div> : <Navigate to="/login" />}</>
  );
};

export default Restricted;
