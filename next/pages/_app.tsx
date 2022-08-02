import React from "react";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { loginInfoAtom, useUserApi } from "@/data/user";
import "@/styles/globals.scss";
type AppInitProps = {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean | null>>
}
function AppInit(props: AppInitProps) {
  const { bearerAuthentication, bearerAuthenticationLoading } = useUserApi();
  const setLoginInfo = useSetRecoilState(loginInfoAtom);
  React.useEffect(() => {
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
  }, []);
  return null;
}
function MyApp({ Component, pageProps }: AppProps) {
  const [isAuth, setIsAuth] = React.useState<boolean | null>(null);
  return (
    <RecoilRoot>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <AppInit setIsAuth={setIsAuth} />
        {isAuth !== null && <Component {...pageProps} />}
      </LocalizationProvider>
    </RecoilRoot>
  );
}

export default MyApp;
