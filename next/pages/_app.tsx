import "@/styles/globals.scss";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { loginInfoAtom, useUserApi } from "@/data/user";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import ja from "date-fns/locale/ja";
import theme from "@/plugins/theme";

type AppInitProps = {
  setIsAuth: Dispatch<SetStateAction<boolean | null>>;
};
function AppInit(props: AppInitProps) {
  const { bearerAuthentication } = useUserApi();
  const setLoginInfo = useSetRecoilState(loginInfoAtom);
  useEffect(() => {
    const mountedFunc = async () => {
      try {
        const res = await bearerAuthentication();
        if (localStorage.getItem("token")) {
          setLoginInfo(res.data);
          props.setIsAuth(true);
        }
      } catch (e) {
        if (axios.isCancel(e)) return;
        props.setIsAuth(false);
      }
    };
    mountedFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
function MyApp({ Component, pageProps }: AppProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
          <CssBaseline />
          <AppInit setIsAuth={setIsAuth} />
          {isAuth !== null && <Component {...pageProps} />}
        </LocalizationProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
