import axios from 'axios';

export const Server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  }
});

Server.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status) {
      console.log('axios error 발생:', error);
    }
  }
);
