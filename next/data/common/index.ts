import { AxiosError } from "axios";
import { SetStateAction } from "react";
export const errHandler = (
  err: AxiosError<{ errorMessage: string }>,
  setter: (value: SetStateAction<string>) => void
) => {
  const errorMessage = err.response?.data?.errorMessage;
  const status = err.response?.status;
  const statusText = err.response?.statusText;
  if (!!errorMessage) {
    setter(errorMessage);
    return;
  }
  if (!!status && !!statusText) {
    setter(`${err.response?.status}：${err.response?.statusText}`);
    return;
  }
  setter("不明なエラー");
};
