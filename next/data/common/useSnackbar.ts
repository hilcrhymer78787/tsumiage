// useSnackbar.ts
import { SyntheticEvent } from "react";
import { atom, useRecoilState } from "recoil";

export type SnackbarItem = {
  id: number;
  message: string;
  severity?: "error" | "success" | "info" | "warning";
};

export const snackbarListAtom = atom<SnackbarItem[]>({
  key: "snackbarListAtom",
  dangerouslyAllowMutability: true,
  default: [],
});

export const useSnackbar = () => {
  const [snackbars, setSnackbars] = useRecoilState(snackbarListAtom);

  const setSnackbar = (msg: string, severity?: "error" | "success" | "info" | "warning") => {
    setSnackbars((prev) => [...prev, { id: Date.now(), message: msg, severity }]);
  };

  const handleClose = (id: number, _event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return; // 背景クリックで閉じないように
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  };

  return {
    snackbars,
    setSnackbar,
    handleClose,
  };
};
