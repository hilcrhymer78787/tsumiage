import { AxiosError } from "axios";

export type CmnErr<T = null> = AxiosError<{
  message: string;
  status: number;
  data: T;
}>;
