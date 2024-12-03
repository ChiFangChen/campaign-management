import axios from 'axios';
import { camelizeKeys, decamelizeKeys } from '@/lib/utils';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.params) {
      config.params = decamelizeKeys(config.params);
    }
    if (config.data) {
      config.data = decamelizeKeys(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    response.data = camelizeKeys(response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response);
    return Promise.reject(error);
  }
);

export default axiosInstance;
