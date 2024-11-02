import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePasswordAPI } from "../../services/users/userServices";
import { useMutation } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlerMesg";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Email is required"),
});
const UpdatePassword = () => {
  const dispatch = useDispatch();

  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: changePasswordAPI,
    mutaktionKey: ["changePassword"],
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      console.log(values);

      mutateAsync(values)
        .then((data) => {
          // console.log(data);
          setTimeout(() => {
            dispatch(logoutAction());
            localStorage.removeItem("userInfo");
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold mb-4">Change Your Password</h2>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
        {isError && (
          <AlertMessage type="error" message={error.response.data.message} />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Password changed" />
        )}
        {isLoading && <AlertMessage type="loading" />}

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="current-password"
          >
            Current Password
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded">
            <AiOutlineLock className="text-gray-400 mr-2" />
            <input
              id="currentPassword"
              type="password"
              name="currentPassword"
              {...formik.getFieldProps("currentPassword")}
              className="outline-none flex-1"
              placeholder="Enter current password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded">
            <AiOutlineLock className="text-gray-400 mr-2" />
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("newPassword")}
              className="outline-none flex-1"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
