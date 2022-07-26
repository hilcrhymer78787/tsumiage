import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { apiBearerAuthentication } from "@/store/index";
import { useMount } from "react-use";
import CssBaseline from "@mui/material/CssBaseline";
import "@/styles/globals.scss";
function MyApp ({ Component, pageProps }: AppProps) {
  useMount(() => apiBearerAuthentication());

  return (
    <Provider store={store}>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
