import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { apiBearerAuthentication } from "@/store/index";
import { useMount } from "react-use";
import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "@/styles/globals.scss";
function MyApp({ Component, pageProps }: AppProps) {
  useMount(() => apiBearerAuthentication());

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Component {...pageProps} />
      </LocalizationProvider>
    </Provider>
  );
}

export default MyApp;
