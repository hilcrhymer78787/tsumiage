import { AxiosError } from "axios";
import { SetStateAction } from "react";
import { ApiErr } from "../types/apiErr";
import { useSnackbar } from "./useSnackbar";
import { useLoginInfo } from "./useLoginInfo";

export const useErrHandler = () => {
  const { setSnackbar } = useSnackbar();
  const { logout } = useLoginInfo();

  const errHandler = (
    err: ApiErr<any>,
    setter: (value: SetStateAction<string>) => void,
    isHiddenSnackbar?: boolean
  ) => {
    const showErr = (errTxt: string) => {
      if (!isHiddenSnackbar) setSnackbar(errTxt, "error");
      setter(errTxt);
      return errTxt;
    };
    const message = err.response?.data?.message;
    const status = err.response?.data?.status;
    if (status === 401) logout();
    if (!!message && !!status) return showErr(`${status} : ${message}`);
    return showErr("不明なエラーが発生しました。");
  };

  return {
    errHandler,
  };
};
