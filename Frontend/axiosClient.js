import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const axiosClient = axios.create({
  baseURL: `http://127.0.0.1:8000/`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
axiosClient.interceptors.request.use((config) => {
  config.headers = { ...config.headers, "Access-Control-Allow-Origin": "*" };
  return config;
});

export default axiosClient;
