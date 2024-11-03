import React from "react";
import { FaUserCircle, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import UpdatePassword from "./UpdatePassword";
import { userProfileAPI } from "../../services/users/userServices";
import { useQuery } from "@tanstack/react-query";

//! Capitalize First Letter
function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const UserProfile = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: userProfileAPI,
  });

  // console.log(user);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },

    //Submit
    onSubmit: (values) => {
      // console.log(values);
    },
  });
  return (
    <>
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-2 text-2xl text-center font-extrabold">Welcome</h1>
        <div className=" my-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex items-center">
              {user ? (
                <img
                  src={
                    user?.data?.data.image ||
                    "https://cdn.pixabay.com/photo/2017/09/16/19/33/parrot-2756488_1280.jpg"
                  }
                  alt="user"
                  className="w-20 h-20 rounded-full mx-auto"
                />
              ) : (
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt="user"
                  className="w-20 h-20 rounded-full mx-auto"
                />
              )}
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {user
                    ? capitalizeFirstLetter(user?.data?.data.username)
                    : "User"}
                </div>
                <a
                  href=""
                  className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                >
                  {user
                    ? capitalizeFirstLetter(user?.data?.data?.designation)
                    : "User"}
                </a>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sit amet nulla auctor, vestibulum magna sed, convallis ex.
                </p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Update Profile
        </h3>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* User Name Field */}
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-3xl text-gray-400" />
            <div className="flex-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                {...formik.getFieldProps("username")}
                type="text"
                id="username"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your username"
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <span className="text-xs text-red-500">
                {formik.errors.username}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-3xl text-gray-400" />
            <div className="flex-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your email"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <span className="text-xs text-red-500">
                {formik.errors.email}
              </span>
            )}
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <UpdatePassword />
    </>
  );
};

export default UserProfile;
