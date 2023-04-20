import jwt from "jwt-decode";

const isLogged = () => !!UserLogged();

const UserLogged = () => {
  const token = getAccessToken();
  if (token === "null" || token === "undefined") {
    return false;
  } else if (isTokenExpired(token)) {
    sessionStorage.removeItem("access_token");
    return false;
  } else {
    return true;
  }
};

const getAccessToken = () => sessionStorage.getItem("access_token");

const isTokenExpired = (token) => {
  const { exp } = jwt(token);
  return exp * 1000 <= Date.now() + 3 * 1000;
};

const CreateSession = async (token) => {
  return sessionStorage.setItem("access_token", token);
};

export default {
  isLogged,
  CreateSession,
};
