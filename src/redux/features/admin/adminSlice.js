import { createSlice } from "@reduxjs/toolkit";

import {
  login,
  uploadCsv,
  verfiyOtp,
  resendOtp,
  adminStats,
  createUser,
  changePlan,
  newPassword,
  getAllUsers,
  getAllPlans,
  createCompany,
  forgetPassword,
  getCurrentPlan,
  bulkUserActions,
  getAllCompanies,
  enterpriseStats,
  createPaymentIntent,
  getUserStatsByMonths,
  subscriptionHistory,
  userEnterpriseRation,
  enterpriseNewPassword,
  removeUserFromCompany,
  updateEnterpriseProfile,
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
        if (action?.payload?.data?.user?.role === "SUPERADMIN") {
          state.user = action?.payload?.data?.user;
          state.token = action?.payload?.data?.accessToken;
        } else {
          if (action?.payload?.data?.user?.onboardingCompleted) {
            state.user = action?.payload?.data?.user;
            state.token = action?.payload?.data?.accessToken;
          }
        }
        state.userRole = action?.payload?.data?.user?.role;
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
      })
      .addCase(getCurrentPlan.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getCurrentPlan.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(getCurrentPlan.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(changePlan.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(changePlan.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(changePlan.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(enterpriseNewPassword.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(enterpriseNewPassword.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(enterpriseNewPassword.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(subscriptionHistory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(subscriptionHistory.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(subscriptionHistory.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(updateEnterpriseProfile.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateEnterpriseProfile.fulfilled, (state, action) => {
        state.loading = "succeeded";
        if (state?.userRole === "ADMIN") {
          state.user = action?.payload?.data?.user;
          state.token = action?.payload?.data?.accessToken;
        }
      })
      .addCase(updateEnterpriseProfile.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(removeUserFromCompany.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(removeUserFromCompany.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(removeUserFromCompany.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(enterpriseStats.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(enterpriseStats.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(enterpriseStats.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(adminStats.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(adminStats.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(adminStats.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(getUserStatsByMonths.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getUserStatsByMonths.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(getUserStatsByMonths.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(userEnterpriseRation.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(userEnterpriseRation.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(userEnterpriseRation.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(uploadCsv.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(uploadCsv.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(uploadCsv.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(bulkUserActions.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(bulkUserActions.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(bulkUserActions.rejected, (state) => {
        state.loading = "failed";
      });
  },
});
export const { customLogout, setToken } = adminSlice.actions;
export default adminSlice.reducer;
