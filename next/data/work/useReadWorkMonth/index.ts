import { Task } from "@/data/task/useReadTasks";
import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export type Calendar = {
  date: string;
  tasks: Task[];
};

export type ReadWorkMonthReq = {
  user_id: number;
  year: number;
  month: number;
};

export const useReadWorkMonth = () => {
  const [readWorkMonthLoading, setReadWorkMonthLoading] = useState(false);
  const [readWorkMonthError, setReadWorkMonthError] = useState("");
  const [calendars, setCalendars] = useState<Calendar[] | null>(null);
  const readWorkMonth = async (params: ReadWorkMonthReq) => {
    setReadWorkMonthError("");
    setReadWorkMonthLoading(true);
    const requestConfig = {
      url: "/api/work/read/month",
      method: "GET",
      params,
    };
    return api(requestConfig as any)
      .then((res) => {
        setCalendars(res.data.data.calendars);
        return res;
      })
      .catch((err) => {
        errHandler(err, setReadWorkMonthError);
      })
      .finally(() => {
        setReadWorkMonthLoading(false);
      });
  };

  return {
    calendars,
    readWorkMonth,
    readWorkMonthError,
    readWorkMonthLoading,
  };
};
