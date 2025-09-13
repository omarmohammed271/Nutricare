// src/api/axiosInstance.js
import axios from 'axios';

// export const baseURL = process.env.REACT_APP_API_URL;
export const baseURL = "http://87.237.225.191:8000/";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosMutateInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});