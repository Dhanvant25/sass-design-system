import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://192.168.1.40:3000";

export const login = async ({ email, password }) => {
  const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
    email,
    password,
  });
  const { tokens, user } = res.data.data;

  Cookies.set("accessToken", tokens.accessToken);
  Cookies.set("refreshToken", tokens.refreshToken);
  Cookies.set("userData", JSON.stringify(user));

  return user;
};

export const signup = async ({
  firstName,
  lastName,
  email,
  password,
  userType,
  confirmPassword,
}) => {
  const payload = {
    firstName,
    lastName,
    email,
    password,
    userType,
    confirmPassword,
  };

  const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, payload);

  const { user, tokens } = res.data.data;

  Cookies.set("accessToken", tokens.accessToken);
  Cookies.set("refreshToken", tokens.refreshToken);
  Cookies.set("userData", JSON.stringify(user));

  return user;
};

export const logout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("userData");
  localStorage.removeItem("userData");

  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
};
