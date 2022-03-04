import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store, { bearerAuthentication } from "@/store/index";
import CssBaseline from "@mui/material/CssBaseline";
import "@/styles/globals.scss";
type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
function MyApp ({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    useEffect(() => {
        bearerAuthentication();
    }, []);
    return (
        <Provider store={store}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
        </Provider>
    );
}

export default MyApp;
