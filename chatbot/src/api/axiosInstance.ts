import axios from "axios";
import { BACKEND_BASE_URL } from "../contants";

// Create an Axios instance with default options
const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export default axiosInstance;