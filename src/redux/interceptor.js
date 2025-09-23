import axios from "axios";
import { customLogout } from "./features/admin/adminSlice";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
});

let store;

const initializeAxiosInterceptors = async () => {
  if (!store) {
    const storeModule = await import("./configStore");
    store = storeModule.store;
  }

  axiosInstance.interceptors.request.use(
    (config) => {
      const hasFiles = config.data instanceof FormData;

      if (hasFiles) {
        config.headers["Content-Type"] = "multipart/form-data";
        config.headers["maxBodyLength"] = "Infinity";
      } else {
        config.headers["Content-Type"] = "application/json";
        config.headers["Accept"] = "application/json";
      }

      const token = store.getState()?.user?.token;
      console.log("token in interceptor", token);

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;
      if (response && response.status === 401) {
        store.dispatch(customLogout());
        toast.error(response?.data?.error?.detail || "Unauthorized");
      }
      return Promise.reject(error);
    }
  );
};

initializeAxiosInterceptors();

export default axiosInstance;
