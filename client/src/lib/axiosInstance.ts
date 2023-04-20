import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://pacific-legend-383801.ew.r.appspot.com',
  headers: {
    "Content-Type": "application/json",
  },
});