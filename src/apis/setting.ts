import axios from 'axios';

export const Server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Server Setting
Server.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
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
    console.log(error);
    return Promise.reject(error);
  }
);
