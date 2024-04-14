import React from "react";
import Router from "next/router";
import { loginInfoAtom } from "@/data/user";
import { useSetRecoilState } from "recoil";
const Logout = () => {
  const setLoginInfo = useSetRecoilState(loginInfoAtom);
  React.useEffect(() => {
    localStorage.removeItem("token");
    setLoginInfo(null);
    Router.push("/auth");
  }, []);
  return <></>;
};
export default Logout; 