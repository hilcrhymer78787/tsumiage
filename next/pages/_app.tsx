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
const CancelToken = axios.CancelToken;
let setLoginInfoByTokenCancel: any = null;
function MyApp({ Component, pageProps }) {
    const [loginInfo, setLoginInfo] = useState(null)
    const testAuthentication = async () => {
        const requestConfig: AxiosRequestConfig = {
            url: `/api/user/test_authentication`,
            method: "GET",
        };
        await api(requestConfig)
            .then((res: AxiosResponse) => {
                localStorage.setItem('token', res.data.token);
                bearerAuthentication()
            })
    }
    const logout = () => {
        localStorage.removeItem("token")
        setLoginInfo(null)
    }
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
                    setLoginInfo(res.data)
                }
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    logout()
                }
            })
    }
    useEffect(() => {
        bearerAuthentication()
    }, [])
    return (
        <div>
            <Provider store={store}>
                <header>
                    {!loginInfo &&
                        <>
                            <div>ログインしていません</div>
                            <Button onClick={testAuthentication} variant="contained" color="primary">ログイン</Button>
                        </>
                    }
                    {loginInfo &&
                        <>
                            <div>{loginInfo.name}</div>
                            <Button onClick={logout} variant="contained" color="primary">ログアウト</Button>
                        </>
                    }
                </header>
                {loginInfo &&
                    <>
                        <main>
                            <Component {...pageProps} />
                        </main>
                        <Navigation />
                    </>
                }
            </Provider>
        </div>
    )
}

export default MyApp
