import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

import { api } from "@/plugins/axios";

const TestPage = () => {
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [resData, setResData] = useState<boolean | null>(null);
  useEffect(() => {
    setIsLoading(true);
    const requestConfig: AxiosRequestConfig = {
      url: "/api/task/read",
      method: "GET",
      params: { date: "2024-07-12", userId: 1 },
    };
    api(requestConfig)
      .then((res) => {
        setResData(res.data);
      })
      .catch((err: ApiErr) => {
        setResData(err.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <p>ローディング中...</p>;
  if (!resData) return <p>データがありません</p>;
  return <pre>{JSON.stringify(resData, null, 6)}</pre>;
};
export default TestPage;
