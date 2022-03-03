import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import '@/styles/reset.scss';
import '@/styles/globals.scss';
import store, { bearerAuthentication } from "@/store/index";
type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    useEffect(() => {
        bearerAuthentication();
    }, []);
    return (
        <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
        </Provider>
    );
}

export default MyApp;
