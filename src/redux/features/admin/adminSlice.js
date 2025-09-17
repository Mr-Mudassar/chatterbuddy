import { createSlice } from "@reduxjs/toolkit";

import {
  addNewTechnicianByAdmin,
  updateTechnicianByAdmin,
  deleteTechnicianByAdmin,
  getAllTechniciansByAdmin,
  validateTipReceiver,
  createStripeIntent,
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
  },
  reducers: {
    customLogout: (state) => {
      console.log("Custom logout");
      state.email = "";
      state.user = null;
      state.token = null;
      state.success = null;
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTechniciansByAdmin.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllTechniciansByAdmin.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(getAllTechniciansByAdmin.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(addNewTechnicianByAdmin.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(addNewTechnicianByAdmin.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(addNewTechnicianByAdmin.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(updateTechnicianByAdmin.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateTechnicianByAdmin.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(updateTechnicianByAdmin.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteTechnicianByAdmin.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteTechnicianByAdmin.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(deleteTechnicianByAdmin.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(validateTipReceiver.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(validateTipReceiver.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(validateTipReceiver.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createStripeIntent.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createStripeIntent.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(createStripeIntent.rejected, (state) => {
        state.loading = "failed";
      });
  },
});
export const { customLogout } = adminSlice.actions;
export default adminSlice.reducer;
