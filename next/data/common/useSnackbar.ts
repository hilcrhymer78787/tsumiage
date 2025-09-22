import { SyntheticEvent } from "react";
import { atom, useRecoilState } from "recoil";

export type LoginInfo = {
  id: number;
  email: string;
  name: string;
  token: string;
  user_img: string;
};

export const messageAtom = atom<string>({
  key: "messageAtom",
  dangerouslyAllowMutability: true,
  default: "",
});

export const severityAtom = atom<"error" | undefined>({
  key: "severityAtom",
  dangerouslyAllowMutability: true,
  default: undefined,
});

export const useSnackbar = () => {
  const [message, setMessage] = useRecoilState(messageAtom);
  const [severity, setSeverity] = useRecoilState(severityAtom);

  const setSnackbar = (msg: string, severity?: "error") => {
    setMessage(msg);
    setSeverity(severity);
  };

  const handleClose = (
    _: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return; // 背景クリックで閉じないように
    setMessage("");
  };
  return {
    message,
    severity,
    setSnackbar,
    handleClose,
  };
};
