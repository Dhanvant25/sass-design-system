import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

export const login = async ({ email, password }) => {
  const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
    email,
    password,
  });
  const { tokens, user } = res.data.data;

  Cookies.set("accessToken", tokens.accessToken);
  Cookies.set("refreshToken", tokens.refreshToken);

  return user;
};

export const signup = async ({ firstName, lastName, email, password }) => {
  const payload = {
    firstName,
    lastName,
    email,
    password,
  };

  const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, payload);

  const { user, tokens } = res.data.data;

  Cookies.set("accessToken", tokens.accessToken);
  Cookies.set("refreshToken", tokens.refreshToken);

  return user;
};
