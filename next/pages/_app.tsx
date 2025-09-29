import "@/styles/globals.scss";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { useBearerAuth } from "@/data/user/useBearerAuth";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material/styles";
import ja from "date-fns/locale/ja";
import theme from "@/plugins/theme";
import MySnackbar from "@/components/common/MySnackbar";
import { useReadWorkMonth } from "@/data/work/useReadWorkMonth";
import dayjs from "dayjs";
import { useLoginInfo } from "@/data/common/useLoginInfo";

const AppInit = ({ setIsAuth }: { setIsAuth: Dispatch<SetStateAction<boolean | null>> }) => {
  const { bearerAuth } = useBearerAuth();
  const { readWorkMonth } = useReadWorkMonth();
  const { loginInfo } = useLoginInfo();
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    const mountedFunc = async () => {
      const res = await bearerAuth();
      setTimeout(() => setIsAuth(!res));
    };
    mountedFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loginInfo) return;
    if (!isFirst) return;
    readWorkMonth({
      user_id: Number(loginInfo.id),
      year: Number(dayjs().format("YYYY")),
      month: Number(dayjs().format("M")),
    });
    setIsFirst(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginInfo]);
  return <></>;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
          <CssBaseline />
          <MySnackbar />
          <AppInit setIsAuth={setIsAuth} />
          {isAuth !== null && <Component {...pageProps} />}
        </LocalizationProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default MyApp;
