import axios from 'axios';
import { getToken } from '../utils/auth'

const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});


request.interceptors.request.use(
  async config => {
    const token = getToken()
  if (token) {
    config.headers['x-access-token'] = token
  }
  return config
  },
  err => {
    return Promise.reject(err.response);
  }
);

export default request;
