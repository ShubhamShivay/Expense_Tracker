import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BaseUrl } from "../../utils/url";
import axios from "axios";

const user = getUserFromStorage();

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

//! @desc   User Profile
export const userProfileAPI = async () => {
  const res = await axios.get(`${BaseUrl}/users/profile`, {
    headers: {
      Authorization: `Bearer ${user?.token || null}`,
    },
  });

  return res;
};

//! @desc   Change Password
export const changePasswordAPI = async ({ currentPassword, newPassword }) => {
  // console.log(currentPassword, newPassword);
  const res = await axios.put(
    `${BaseUrl}/users/change-password`,
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token || null}`,
      },
    }
  );

  return res;
};
