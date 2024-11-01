import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BaseUrl } from "../../utils/url";
import axios from "axios";

const user = getUserFromStorage();
// console.log(user?.token);

//! @desc   Add Transaction
export const addTransactionAPI = async ({
  amount,
  type,
  category,
  date,
  description,
}) => {
  const res = await axios.post(
    `${BaseUrl}/transactions/add`,
    {
      amount,
      type,
      category,
      date,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );

  return res;
};

//! @desc   Get Transactions
export const getTransactionsAPI = async ({
  startDate,
  endDate,
  type,
  category,
}) => {
  const res = await axios.get(`${BaseUrl}/transactions/all`, {
    params: {
      startDate,
      endDate,
      type,
      category,
    },
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return res;
};
