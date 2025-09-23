// TODO: ファイル名、リファクタ
import { AxiosError } from "axios";
import { SetStateAction } from "react";
import { Error } from "@/data/types/error";
export const errHandler = (
  err: AxiosError<Error>,
  setter: (value: SetStateAction<string>) => void
) => {
  const message = err.response?.data?.data?.message;
  if (!!message) {
    setter(message);
    return message;
  }
  const error = "不明なエラー";
  setter(error);
  return error;
};
