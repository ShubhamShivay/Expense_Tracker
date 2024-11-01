import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { getTransactionsAPI } from "../../services/transactions/transactionServices";
import { getCategoryAPI } from "../../services/category/categoryServices";

const capitalizeFirstLetter = (val) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};
const TransactionsList = () => {
  //! Filtering State
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  const HandleFilterChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  console.log(filters);

  //! Fetch categories
  const {
    isLoading: isLoadingCategories,
    error: errorCategories,
    data: categories,
    isFetched: isFetchedCategories,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryAPI,
  });

  const {
    data: transactions,
    isLoading,
    refetch,
    error,
    isFetched,
    isError,
  } = useQuery({
    queryFn: () => getTransactionsAPI(filters),
    queryKey: ["get-transactions", filters],
  });

  // console.log(transactions);

  return (
    <>
      
      <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Start Date */}
          <input
            type="date"
            name="startDate"
            value={filters?.startDate}
            onChange={HandleFilterChange}
            className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {/* End Date */}
          <input
            type="date"
            name="endDate"
            value={filters?.endDate}
            onChange={HandleFilterChange}
            className="p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {/* Type */}
          <div className="relative">
            <select
              name="type"
              onChange={HandleFilterChange}
              value={filters?.type}
              className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          {/* Category */}
          <div className="relative">
            <select
              name="category"
              onChange={HandleFilterChange}
              value={filters?.category}
              className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 appearance-none"
            >
              <option value="">All Categories</option>
              {categories?.data?.data?.map((category) => (
                <option key={category._id} value={category.name}>
                  {capitalizeFirstLetter(category.name)}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="my-4 p-4 shadow-lg rounded-lg bg-white">
          {/* Inputs and selects for filtering (unchanged) */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Filtered Transactions
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {transactions?.data?.map((transaction) => (
                <li
                  key={transaction._id}
                  className="bg-white p-3 rounded-md shadow border border-gray-200 flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                    <span
                      className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </span>
                    <span className="ml-2 text-gray-800">
                      <span className="text-sm text-gray-950 italic">
                        {transaction.category}
                      </span>{" "}
                      - &#8377;
                      {transaction.amount.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600 italic ml-2">
                      {capitalizeFirstLetter(transaction.description)}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleUpdateTransaction(transaction.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionsList;
