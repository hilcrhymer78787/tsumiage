import { AxiosError } from "axios";

export type ApiErr<T = null> = AxiosError<{
  message: string;
  status: number;
  data: T;
}>;