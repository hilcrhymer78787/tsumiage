import React from "react";
import Router from "next/router";
import { loginInfoAtom, useUserApi } from "@/data/user";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
const Logout = () => {
  const setLoginInfo = useSetRecoilState(loginInfoAtom);
  const { bearerAuthentication, bearerAuthenticationLoading } = useUserApi();
  React.useEffect(() => {
    localStorage.removeItem("token");
    setLoginInfo(null);
    Router.push("/login");
  }, []);
  return <></>;
};
export default Logout; 