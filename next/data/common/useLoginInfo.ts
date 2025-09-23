import { atom, useRecoilState } from "recoil";
import { LoginInfo } from "@/data/types/loginInfo";

export const loginInfoAtom = atom<LoginInfo | null>({
  key: "loginInfo",
  dangerouslyAllowMutability: true,
  default: null,
});

export const useLoginInfo = () => {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom);
  return {
    loginInfo,
    setLoginInfo,
  };
};
