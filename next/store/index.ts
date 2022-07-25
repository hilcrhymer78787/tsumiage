import { createStore } from "redux";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from "@/plugins/axios";
import axios from "axios";
import { apiUserBearerAuthenticationResponseType } from "@/types/api/user/bearerAuthentication/response";
const CancelToken = axios.CancelToken;
let setLoginInfoByTokenCancel: any = null;

const initialState = {
  loginInfo: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "setLoginInfo":
      return { ...state, loginInfo: action.value };
    default:
      return state;
  }
};
const store = createStore(reducer);

export const bearerAuthentication = async () => {
  if (setLoginInfoByTokenCancel) {
    setLoginInfoByTokenCancel();
  }
  const requestConfig: AxiosRequestConfig = {
    url: `/api/user/bearer_authentication`,
    method: "GET",
    cancelToken: new CancelToken((c) => {
      setLoginInfoByTokenCancel = c;
    }),
  };
  api(requestConfig).then(
    (res: AxiosResponse<apiUserBearerAuthenticationResponseType>) => {
      // トークンが有効
      if (localStorage.getItem("token")) {
        store.dispatch({ type: "setLoginInfo", value: res.data });
      }
    }
  );
};
export default store;
