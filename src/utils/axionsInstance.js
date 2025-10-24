// utils/axiosInstance.js
import axios from 'axios';
import AlertModal from '@/components/modal/AlertModal';
import { getToken } from './Common';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://hackatom-backend.onrender.com/', // Optional
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Check if token is in localStorage (or use cookies if you prefer)
    const token = getToken(); // or 'accessToken', based on your naming
    config.headers.Authorization = `Bearer ${token}`;
    console.log(config," headers");
    if (config?.data && config?.data?.file instanceof File || config?.data?.url == "/api/v1/users/updateProfile") {
      config.headers["Content-Type"] = "multipart/form-data";

    }
    else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor: Handle Errors Globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const resData = error?.response?.data;
    const message =
      resData?.message || 'Something went wrong. Please try again.';
    const redirectTo = resData?.redirectTo;

    // Show error modal
    AlertModal({
      icon: 'error',
      title: 'Error',
      text: message,
      buttonText: 'OK',
    }).then(() => {
      // ✅ If redirectTo exists, navigate the user
      if (redirectTo) {
        window.location.href = redirectTo; // You can also use next/router if inside a component
      }
    });

    return Promise.reject(error);
  }
);

export default axiosInstance;
