import { atom, useRecoilState } from "recoil";

export type LoginInfo = {
  id: number;
  email: string;
  name: string;
  token: string;
  user_img: string;
};

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
