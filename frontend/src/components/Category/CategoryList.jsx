import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCategoryAPI,
  getCategoryAPI,
} from "../../services/category/categoryServices";
import AlertMessage from "../Alert/AlerMesg";

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const CategoriesList = () => {
  const { isLoading, error, data, isFetched, refetch } = useQuery({
    queryFn: getCategoryAPI,
    queryKey: ["categories"],
  });

  console.log("Categories", data);

  //! Delete Category
  const navigate = useNavigate();

  const {
    mutateAsync,
    isLoading: isLoadingDelete,
    isError,
    error: errorDelete,
    isSuccess,
  } = useMutation({
    mutationFn: deleteCategoryAPI,
    mutationKey: ["delete-category"],
  });

  const handleDelete = (id) => {
    mutateAsync({ id })
      .then((data) => {
        //! Refetch
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
        {/* Display alert message */}
        {isLoading && <AlertMessage type="loading" message="Loading..." />}
        {error && <AlertMessage type="error" message={error.message} />}
        {isFetched && <AlertMessage type="success" message="Data fetched" />}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-4">
          Categories
        </h2>

        <ul className="space-y-4">
          {data?.data?.map((category) => (
            <li
              key={category?._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
            >
              <div>
                <span className="text-gray-800">
                  {capitalizeFirstLetter(category?.name)}
                </span>
                <span
                  className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    category.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {category?.type?.charAt(0).toUpperCase() +
                    category?.type?.slice(1)}
                </span>
              </div>
              <div className="flex space-x-3">
                <Link to={`/update-category/${category._id}`}>
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(category?._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoriesList;
