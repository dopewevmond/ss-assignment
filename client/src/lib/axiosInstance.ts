import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  // baseURL: 'https://pacific-legend-383801.ew.r.appspot.com',
  headers: {
    "Content-Type": "application/json",
  },
});