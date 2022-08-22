import axios from "axios";

import { API_URI } from "./config";

const axiosInstance = axios.create({
  baseURL: API_URI,
});

export default axiosInstance;
