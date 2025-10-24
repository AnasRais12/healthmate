// utils/requestHelper.js
import axiosInstance from './axionsInstance';
const apiRequest = async ({
  url,
  method = 'POST',
  data = {},
  params = {},
  onSuccess = () => { },
  headers = {},
}) => {
  try {
    const response = await axiosInstance({
      url,
      method: method.toLowerCase(),
      data: ['post', 'put', 'patch'].includes(method.toLowerCase())
        ? data
        : undefined,
      params: ['get', 'delete'].includes(method.toLowerCase())
        ? params
        : undefined,
      headers,
    });
    if (response?.data?.success) {
      onSuccess(response.data);
    }

    return response;
  } catch (error) {
    console.error("API Request Error:", error);
    // Error handled by interceptor
  }
};

export default apiRequest;
