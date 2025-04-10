// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically return response.data from all requests
api.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default api;
