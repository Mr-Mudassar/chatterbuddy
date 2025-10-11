import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../interceptor";
import toast from "react-hot-toast";

export const login = createAsyncThunk(
  "login",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "forgetPassword",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const verfiyOtp = createAsyncThunk(
  "verfiyOtp",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const resendOtp = createAsyncThunk(
  "resendOtp",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const newPassword = createAsyncThunk(
  "newPassword",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const getAllCompanies = createAsyncThunk(
  "getAllCompanies",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const createCompany = createAsyncThunk(
  "createCompany",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const createUser = createAsyncThunk(
  "createUser",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const getAllPlans = createAsyncThunk(
  "getAllPlans",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const createPaymentIntent = createAsyncThunk(
  "createPaymentIntent",
  async ({ apiEndpoint, requestData, token }, thunkAPI) => {
    try {
      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`, // 👈 override global token
            },
          }
        : {}; // use default if no token provided

      const response = await axiosInstance.put(
        apiEndpoint,
        requestData,
        config
      );

      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response?.status });
    }
  }
);

// export const createStripeIntent = createAsyncThunk(
//   "createStripeIntent",
//   async ({ apiEndpoint, requestData }, thunkAPI) => {
//     try {
//       const response = await axiosInstance.post(apiEndpoint, requestData);
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.error?.message);
//       return thunkAPI.rejectWithValue({
//         statusCode: error.response.status,
//       });
//     }
//   }
// );

export const getCurrentPlan = createAsyncThunk(
  "getCurrentPlan",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const changePlan = createAsyncThunk(
  "changePlan",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({
        statusCode: error.response.status,
      });
    }
  }
);

export const enterpriseNewPassword = createAsyncThunk(
  "enterpriseNewPassword",
  async ({ apiEndpoint, requestData, token }, thunkAPI) => {
    try {
      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`, // 👈 override global token
            },
          }
        : {}; // use default if no token provided

      const response = await axiosInstance.post(
        apiEndpoint,
        requestData,
        config
      );

      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response?.status });
    }
  }
);

export const subscriptionHistory = createAsyncThunk(
  "subscriptionHistory",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const updateEnterpriseProfile = createAsyncThunk(
  "updateEnterpriseProfile",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(apiEndpoint, requestData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({
        statusCode: error.response.status,
      });
    }
  }
);

export const removeUserFromCompany = createAsyncThunk(
  "removeUserFromCompany",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(apiEndpoint);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const enterpriseStats = createAsyncThunk(
  "enterpriseStats",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const adminStats = createAsyncThunk(
  "adminStats",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const getUserStatsByMonths = createAsyncThunk(
  "getUserStatsByMonths",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const userEnterpriseRation = createAsyncThunk(
  "userEnterpriseRation",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const uploadCsv = createAsyncThunk(
  "uploadCsv",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const bulkUserActions = createAsyncThunk(
  "bulkUserActions",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);
