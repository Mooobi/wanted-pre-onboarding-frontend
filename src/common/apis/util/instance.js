import axios from 'axios';
import { BASE_URL } from '../../util/constants';

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    config.headers.Authorization = accessToken;
  }

  return config;
});
