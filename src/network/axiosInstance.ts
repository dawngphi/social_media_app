import axios from 'axios';
import {localStorage} from '@/utils';

const AxiosInstance = (contentType = 'application/json') => {
   const BASE_URL = 'https://sever-social-media-app.onrender.com/';
  // const BASE_URL = 'http://192.168.1.11:8000/';
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // có tác dụng khi gọi api lâu quá thì sẽ   báo lỗi
  });

  axiosInstance.interceptors.request.use(
    async (config: any) => {
      const token = localStorage.getString('token');
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': contentType,
      };
      return config;
    },
    err => Promise.reject(err),
  );

  axiosInstance.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err),
  );
  return axiosInstance;
};

export default AxiosInstance;
