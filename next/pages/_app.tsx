import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import Navigation from "../components/Navigation";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Button from '@material-ui/core/Button';
import { api } from '../plugins/axios';
import '../styles/reset.css'
import '../styles/frame.scss'
import '../styles/globals.scss'
import store from "../store/index";
import axios from 'axios'
import { apiUserBearerAuthenticationResponseType } from "../types/api/user/bearerAuthentication/response"
type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
const CancelToken = axios.CancelToken;
let setLoginInfoByTokenCancel: any = null;
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    const bearerAuthentication = async () => {
        if (setLoginInfoByTokenCancel) {
            setLoginInfoByTokenCancel()
        }
        const requestConfig: AxiosRequestConfig = {
            url: `/api/user/bearer_authentication`,
            method: "GET",
            cancelToken: new CancelToken(c => {
                setLoginInfoByTokenCancel = c
            }),
        };
        api(requestConfig)
            .then((res: AxiosResponse<apiUserBearerAuthenticationResponseType>) => {
                // トークンが有効
                if (localStorage.getItem("token")) {
                    // if ((this.$router.currentRoute.name == 'login' || this.$router.currentRoute.name == 'login-newUser')) {
                    //     this.$router.push("/");
                    // }
                    store.dispatch({ type: "setLoginInfo", value: res.data })
                }
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    localStorage.removeItem("token")
                }
            })
    }
    useEffect(() => {
        bearerAuthentication()
    }, [])
    return (
        <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
        </Provider>
    )
}

export default MyApp
