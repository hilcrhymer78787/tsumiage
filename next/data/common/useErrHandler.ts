import { AxiosError } from "axios";
import { SetStateAction } from "react";
import { Error } from "../types/error";
import { useSnackbar } from "./useSnackbar";

export const useErrHandler = () => {
  const { setSnackbar } = useSnackbar();
  const errHandler = (
    err: AxiosError<Error>,
    setter: (value: SetStateAction<string>) => void
  ) => {
    const message = err.response?.data?.data?.message;
    const status = err.response?.data?.data?.status;
    if (!!message && !!status) {
      const error = `${status} : ${message}`;
      setSnackbar(error, "error");
      setter(error);
      return error;
    }
    const error = "不明なエラーが発生しました。";
    setSnackbar(error, "error");
    setter(error);
    return error;
  };

  return {
    errHandler,
  };
};
