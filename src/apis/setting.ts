import axios from 'axios';

import { getItemWithExpireTime } from '@utils/storage';

export const Server = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SERVER_URL : '',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Server Setting
Server.interceptors.request.use(
  (config) => {
    const accessToken = getItemWithExpireTime('accessToken');
    if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
