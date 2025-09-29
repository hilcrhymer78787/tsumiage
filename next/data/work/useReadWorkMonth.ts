import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { Success } from "@/data/types/success";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {
  user_id: number;
  year: number;
  month: number;
};
type ApiRes = CmnRes<{
  calendars: Calendar[];
}>;
type ApiErr = CmnErr;
import dayjs from "dayjs";
import { Calendar } from "@/data/types/calendar";

export const calendarsAtom = atom<Calendar[] | null>({
  key: "calendar",
  dangerouslyAllowMutability: true,
  default: null,
});

export const useReadWorkMonth = () => {
  const { errHandler } = useErrHandler();
  const { loginInfo } = useLoginInfo();
  const [readWorkMonthLoading, setReadWorkMonthLoading] = useState(false);
  const [readWorkMonthError, setReadWorkMonthError] = useState("");
  const [calendars, setCalendars] = useState<Calendar[] | null>(null);
  const [myTomonthCalendars, setMyTomonthCalendars] = useRecoilState(calendarsAtom);

  const readWorkMonth = async (params: ApiReq) => {
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
      .then((res: ApiRes) => {
        if (isMyTomonth) setMyTomonthCalendars(res.data.data.calendars);
        setCalendars(res.data.data.calendars);
        return res;
      })
      .catch((err: ApiErr) => {
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
