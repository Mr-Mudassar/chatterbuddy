import { createSlice } from "@reduxjs/toolkit";

import {
  login,
  verfiyOtp,
  resendOtp,
  createUser,
  newPassword,
  getAllUsers,
  getAllPlans,
  createCompany,
  forgetPassword,
  getAllCompanies,
  createPaymentIntent,
} from "./adminApi";

export const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    email: "",
    user: null,
    token: null,
    error: null,
    success: null,
    userRole: null,
    loading: "idle",
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

    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = "succeeded";
        if (action?.payload?.data?.user?.userRole === "SUPERADMIN") {
          state.user = action?.payload?.data?.user;
          state.token = action?.payload?.data?.accessToken;
        }
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
      })
      .addCase(getAllPlans.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllPlans.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(getAllPlans.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createPaymentIntent.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(createPaymentIntent.rejected, (state) => {
        state.loading = "failed";
      });
  },
});
export const { customLogout, setToken } = adminSlice.actions;
export default adminSlice.reducer;
