import { createSlice } from "@reduxjs/toolkit";

// ! initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("userInfo")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, actions) => {
      state.user = actions.payload;
    },
    logoutAction: (state, actions) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

// ! Generate action

export const { loginAction, logoutAction } = authSlice.actions;

// ! Generate reducer
const authReducer = authSlice.reducer;

export default authReducer;
