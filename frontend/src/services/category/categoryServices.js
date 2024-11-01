import { BaseUrl } from "../../utils/url";
import axios from "axios";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

const user = getUserFromStorage();
console.log("token", user?.token || null);

//! @desc   User Add Category
export const addCategoryAPI = async ({ name, type, token }) => {
  const res = await axios.post(
    `${BaseUrl}/categories/add`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );

  // console.log(token);

  return res;
};

//! @desc   Category List
export const getCategoryAPI = async () => {
  const res = await axios.get(`${BaseUrl}/categories/all`, {
    headers: {
      Authorization: `Bearer ${user?.token || null}`,
    },
  });

  return res;
};

//! @desc   Update Category
export const updateCategoryAPI = async ({ id, name, type }) => {
  const res = await axios.put(
    `${BaseUrl}/categories/update/${id}`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );

  return res;
};

//! @desc   Delete Category
export const deleteCategoryAPI = async ({ id }) => {
  const res = await axios.delete(`${BaseUrl}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res;
};
