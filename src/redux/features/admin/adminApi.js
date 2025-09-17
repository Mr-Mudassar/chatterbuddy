import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../interceptor";
import toast from "react-hot-toast";

export const getAllTechniciansByAdmin = createAsyncThunk(
  "getAllTechniciansByAdmin",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.data?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const addNewTechnicianByAdmin = createAsyncThunk(
  "addNewTechnicianByAdmin",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.data?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const updateTechnicianByAdmin = createAsyncThunk(
  "updateTechnicianByAdmin",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(apiEndpoint, requestData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.data?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const deleteTechnicianByAdmin = createAsyncThunk(
  "deleteTechnicianByAdmin",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(apiEndpoint);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.data?.message);
      return thunkAPI.rejectWithValue({ statusCode: error.response.status });
    }
  }
);

export const validateTipReceiver = createAsyncThunk(
  "validateTipReceiver",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.data?.message);
      return thunkAPI.rejectWithValue({
        statusCode: error.response.status,
      });
    }
  }
);

export const createStripeIntent = createAsyncThunk(
  "createStripeIntent",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.data?.message);
      return thunkAPI.rejectWithValue({
        statusCode: error.response.status,
      });
    }
  }
);
