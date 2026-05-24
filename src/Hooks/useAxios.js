import axios from 'axios';
import { useEffect } from 'react';

const instance = axios.create({
  baseURL: 'https://task-managemant-server-alpha.vercel.app',
});

const useAxios = () => {
   const token = localStorage.getItem('token');
  useEffect(() => {
   
    const interceptorReq = instance.interceptors.request.use(function (config) {
      if (token) {
        config.headers.Authorization=`Bearer ${token}`;
      }
      return config;
    });

    // Add a response interceptor
   const interceptorRes = instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    return () => {
     instance.interceptors.request.eject(interceptorReq);
     instance.interceptors.response.eject(interceptorRes);
    }
 },[token])
  return instance;
};

export default useAxios;