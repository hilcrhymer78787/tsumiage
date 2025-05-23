import { loginInfoAtom } from "@/data/user";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
const Logout = () => {
  const router = useRouter();
  const setLoginInfo = useSetRecoilState(loginInfoAtom);
  useEffect(() => {
    localStorage.removeItem("token");
    setLoginInfo(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
export default Logout;
