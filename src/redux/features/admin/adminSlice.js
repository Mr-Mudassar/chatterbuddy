import { createSlice } from "@reduxjs/toolkit";

import {
  login,
  verfiyOtp,
  resendOtp,
  newPassword,
  getAllUsers,
  forgetPassword,
  createCompany,
  createUser,
  getAllCompanies,
} from "./adminApi";

export const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    email: "",
    user: null,
    token: null,
    error: null,
    success: null,
    loading: "idle",
    userRole: null,
  },
  reducers: {
    customLogout: (state) => {
      state.email = "";
      state.user = null;
      state.token = null;
      state.success = null;
      state.loading = "idle";
      state.userRole = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action?.payload?.data?.user;
        state.token = action?.payload?.data?.accessToken;
        state.userRole = action?.payload?.data?.user?.userRole;
      })
      .addCase(login.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(forgetPassword.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(verfiyOtp.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(verfiyOtp.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(verfiyOtp.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(resendOtp.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(newPassword.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(newPassword.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(newPassword.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createCompany.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createCompany.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(createCompany.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(getAllCompanies.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllCompanies.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(getAllCompanies.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllUsers.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = "failed";
      });
  },
});
export const { customLogout } = adminSlice.actions;
export default adminSlice.reducer;
