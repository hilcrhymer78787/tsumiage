import { AxiosError } from "axios";
import { SetStateAction } from "react";
import { Error } from "../types/error";
import { useSnackbar } from "./useSnackbar";

export const useErrHandler = () => {
  const { setSnackbar } = useSnackbar();
  const errHandler = (
    err: AxiosError<Error>,
    setter: (value: SetStateAction<string>) => void,
    isHiddenSnackbar?: boolean
  ) => {
    const showErr = (errTxt: string) => {
      if (!isHiddenSnackbar) setSnackbar(errTxt, "error");
      setter(errTxt);
      return errTxt;
    };
    const message = err.response?.data?.data?.message;
    const status = err.response?.data?.data?.status;
    if (!!message && !!status) return showErr(`${status} : ${message}`);
    return showErr("不明なエラーが発生しました。");
  };

  // isHiddenSnackbar
  return {
    errHandler,
  };
};
