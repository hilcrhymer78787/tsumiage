import { AxiosResponse } from "axios";

export type CmnRes<T = null> = AxiosResponse<{
  status: 200;
  data: T;
}>;
