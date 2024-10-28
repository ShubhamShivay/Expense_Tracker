import { BaseUrl } from "../../utils/url";
import axios from "axios";

//! @desc   User Login
export const loginAPI = async ({ email, password }) => {
  const res = await axios.post(`${BaseUrl}/users/login`, {
    email,
    password,
  });

  return res;
};

//! @desc   User Registration
export const registerAPI = async ({ username, email, password }) => {
  const res = await axios.post(`${BaseUrl}/users/register`, {
    username,
    email,
    password,
  });

  return res;
};
