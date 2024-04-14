import React from "react";
import { loginInfoAtom } from "@/data/user";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
const Logout = () => {
  const router = useRouter();
  const setLoginInfo = useSetRecoilState(loginInfoAtom);
  React.useEffect(() => {
    localStorage.removeItem("token");
    setLoginInfo(null);
    router.push("/auth");
  }, []);
  return <></>;
};
export default Logout; 