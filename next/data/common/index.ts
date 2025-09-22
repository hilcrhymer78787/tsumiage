import { AxiosError } from "axios";
import { SetStateAction } from "react";
type Error = {
  data: {
    errorMessage: string,
    status: number,
  },
};

export const errHandler = (
  err: AxiosError<Error>,
  setter: (value: SetStateAction<string>) => void
) => {
  const errorMessage = err.response?.data?.data?.errorMessage;
  if (!!errorMessage) {
    setter(errorMessage);
    return errorMessage;
  }
  const error = "不明なエラー";
  setter(error);
  return error;
};
