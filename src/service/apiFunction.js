import apiRequest from '@/utils/requestHelper';

export const postRequest = (url, data, onSuccess, headers = {}) =>
  apiRequest({
    url: url,
    method: 'POST',
    data,
    onSuccess,
    headers
  });
export const getRequest = (url, onSuccess, params = {}) => {
  return apiRequest({
    url,
    method: 'GET',
    onSuccess,
    params,
  });
};

export const putRequest = (url, data, onSuccess) =>
  apiRequest({
    url: url,
    method: 'PUT',
    data,
    onSuccess,
  });

export const deleteRequest = (url, onSuccess) =>
  apiRequest({
    url: url,
    method: 'DELETE',
    onSuccess,
  });
