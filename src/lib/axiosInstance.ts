import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com/products",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
