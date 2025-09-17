import { useLoginInfo } from "@/data/common/useLoginInfo";
import { useEffect } from "react";
const Logout = () => {
  const { setLoginInfo } = useLoginInfo();
  useEffect(() => {
    localStorage.removeItem("token");
    setLoginInfo(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
export default Logout;
