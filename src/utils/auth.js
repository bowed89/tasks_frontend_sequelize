import Cookies from "js-cookie";

export const login = (user, pass) => {
  return user === "admin" && pass === "admin";
};

export const isLoggedIn = () => {
  const token = Cookies.get("token");
  return !!token;
};

export const logout = () => {
  Cookies.remove("token");
};
