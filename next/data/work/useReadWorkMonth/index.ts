// TODO: requestConfig as any 撤廃
import { Task } from "@/data/task/useReadTasks";
import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { loginInfoAtom } from "@/data/user";
import dayjs from "dayjs";

export const calendarsAtom = atom<Calendar[] | null>({
  key: "calendar",
  dangerouslyAllowMutability: true,
  default: null,
});

export type Calendar = {
  date: string;
  tasks: Task[];
};

export const useReadWorkMonth = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const [readWorkMonthLoading, setReadWorkMonthLoading] = useState(false);
  const [readWorkMonthError, setReadWorkMonthError] = useState("");
  const [calendars, setCalendars] = useState<Calendar[] | null>(null);
  const [myTomonthCalendars, setMyTomonthCalendars] =
    useRecoilState(calendarsAtom);

  const readWorkMonth = async (params: {
    user_id: number;
    year: number;
    month: number;
  }) => {
    const isMyTomonth =
      loginInfo?.id === params.user_id &&
      Number(dayjs().format("YYYY")) === params.year &&
      Number(dayjs().format("M")) === params.month;
    setReadWorkMonthError("");
    setReadWorkMonthLoading(true);
    return api({
      url: "/api/work/read/month",
      method: "GET",
      params,
    })
      .then((res) => {
        if (isMyTomonth) setMyTomonthCalendars(res.data.data.calendars);
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
    myTomonthCalendars,
    readWorkMonth,
    readWorkMonthError,
    readWorkMonthLoading,
  };
};
