import axios from 'axios';

export const api = axios.create({
  baseURL: 'localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
