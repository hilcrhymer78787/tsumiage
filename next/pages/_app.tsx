import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Button from '@mui/material/Button';
import { api } from '@/plugins/axios';
import '@/styles/reset.scss';
import '@/styles/frame.scss';
import '@/styles/globals.scss';
import store, { bearerAuthentication } from "@/store/index";
import axios from 'axios';
import { apiUserBearerAuthenticationResponseType } from "@/types/api/user/bearerAuthentication/response";
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
