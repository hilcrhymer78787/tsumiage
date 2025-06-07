import Router from "next/router";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((req: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (!req.headers) return req;
  req.headers.Accept = "application/json";
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

api.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.config.baseURL) {
      console.log(res.config.baseURL + res.config.url, res);
    }
    return res;
  },
  (err: AxiosError) => {
    if (axios.isCancel(err)) {
      console.error("リクエストがキャンセルされました");
    } else {
      console.error(err.response);
    }
    if (err.response?.status == 429) {
      alert("一定時間にアクセスが集中したため、しばらくアクセスできません");
    }
    throw err;
  }
);
