import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage.jsx";
import PublicNavbar from "./components/Navbar/PublicNavbar.jsx";
import Login from "./components/Users/Login.jsx";
import Register from "./components/Users/Register.jsx";
import PrivateNavbar from "./components/Navbar/PrivateNavbar.jsx";
import { getUserFromStorage } from "./utils/getUserFromStorage.js";
import { useSelector } from "react-redux";
import UserProfile from "./components/Users/UserProfile.jsx";
import AddCategory from "./components/Category/AddCategory.jsx";
import CategoriesList from "./components/Category/CategoryList.jsx";
import TransactionForm from "./components/Transactions/TransactionForm.jsx";
import UpdateCategory from "./components/Category/UpdateCategory.jsx";
import Dashboard from "./components/Users/Dashboard.jsx";
import TransactionChart from "./components/Transactions/TransactionChart.jsx";
import AuthRoute from "./components/Auth/AuthRoute.jsx";

function App() {
  const user = useSelector((state) => state?.auth?.user);
  // console.log(user?.token);

  return (
    <BrowserRouter>
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <HomePage /> : <Login />} />
        <Route path="/register" element={user ? <HomePage /> : <Register />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              {" "}
              <UserProfile />{" "}
            </AuthRoute>
          }
        />
        <Route
          path="/add-category"
          element={
            <AuthRoute>
              <AddCategory />
            </AuthRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <AuthRoute>
              <CategoriesList />
            </AuthRoute>
          }
        />
        <Route
          path="/update-category/:id"
          element={
            <AuthRoute>
              <UpdateCategory />
            </AuthRoute>
          }
        />

        <Route path="/add-transaction" element={<TransactionForm />} />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        {/* <Route path="/chart" element={<TransactionChart />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
