import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Button, CircularProgress, TextField } from '@mui/material';
import SendIcon from '@material-ui/icons/Send';
import LoginLayout from '@/layouts/login';
import { apiUserBasicAuthenticationRequestType } from "@/types/api/user/basicAuthentication/request";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from '@/plugins/axios';
import store from "@/store/index";
import { errorType } from "@/types/error";
Login.getLayout = function getLayout(page) {
    return (
        <LoginLayout>{page}</LoginLayout>
    );
};
function Login() {
    const [email, setEmail] = useState("" as string);
    const [emailError, setEmailError] = useState("" as string);
    const [password, setPassword] = useState("" as string);
    const [passwordError, setPasswordError] = useState("" as string);
    const [basicAuthenticationLoading, setBasicAuthenticationLoading] = useState(false as boolean);
    const [testAuthenticationLoading, setTestAuthenticationLoading] = useState(false as boolean);
    const testAuthentication = async () => {
        const requestConfig: AxiosRequestConfig = {
            url: `/api/user/test_authentication`,
            method: "GET",
        };
        setTestAuthenticationLoading(true);
        await api(requestConfig)
            .then((res: AxiosResponse) => {
                localStorage.setItem('token', res.data.token);
                store.dispatch({ type: "setLoginInfo", value: res.data });
            })
            .finally(() => {
                setTestAuthenticationLoading(false);
            });
    };
    const basicAuthentication = async () => {
        if (validation()) {
            return;
        }
        setBasicAuthenticationLoading(true);
        const apiParam: apiUserBasicAuthenticationRequestType = {
            email: email,
            password: password
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/user/basic_authentication`,
            method: "POST",
            data: apiParam
        };
        await api(requestConfig)
            .then((res: AxiosResponse) => {
                localStorage.setItem('token', res.data.token);
                store.dispatch({ type: "setLoginInfo", value: res.data });
            })
            .catch((err: AxiosError<errorType>) => {
                if (err.response?.data.errorMessage) {
                    alert(err.response.data.errorMessage);
                }
            })
            .finally(() => {
                setBasicAuthenticationLoading(false);
            });
    };
    const validation = (): boolean => {
        let isError: boolean = false;
        setEmailError("");
        setPasswordError("");
        if (!(/.+@.+\..+/.test(email))) {
            setEmailError("正しい形式で入力してください");
            isError = true;
        }
        if (password.length < 8) {
            setPasswordError("パスワードは8桁以上で設定してください");
            isError = true;
        }
        return isError;
    };
    return (
        <div className='card'>
            <div className="card_header">
                <div className="card_header_left">
                    <h2 className="card_header_left_main">ログイン</h2>
                </div>
            </div>
            <div className="card_body">
                <ul>
                    <li className='mb-3'>
                        <TextField
                            onKeyPress={e => { if (e.key === 'Enter') { basicAuthentication(); } }}
                            error={Boolean(emailError)}
                            helperText={emailError}
                            value={email}
                            onChange={(e) => { setEmail(e.currentTarget.value); }}
                            label="email" variant="outlined" color="primary" />
                    </li>
                    <li className='mb-3'>
                        <TextField
                            onKeyPress={e => { if (e.key === 'Enter') { basicAuthentication(); } }}
                            error={Boolean(passwordError)}
                            helperText={passwordError}
                            value={password}
                            onChange={(e) => { setPassword(e.currentTarget.value); }}
                            label="password" variant="outlined" color="primary" />
                    </li>
                </ul>
                {process.env.NEXT_PUBLIC_IS_SHOW_TEST_USER == '1' &&
                    <div className='d-flex justify-end'>
                        <Button
                            onClick={testAuthentication}
                            variant="contained"
                            endIcon={testAuthenticationLoading ? <CircularProgress size={25} /> : <SendIcon />}
                            disabled={testAuthenticationLoading || basicAuthenticationLoading}
                        >テストユーザーでログイン</Button>
                    </div>
                }
            </div>
            <div className="card_footer justify-space-between">
                <Button
                    onClick={() => { Router.push("/login/new"); }}
                    variant="contained">新規登録</Button>
                <Button color="primary"
                    onClick={basicAuthentication}
                    variant="contained"
                    endIcon={basicAuthenticationLoading ? <CircularProgress size={25} /> : <SendIcon />}
                    disabled={testAuthenticationLoading || basicAuthenticationLoading}
                >ログイン</Button>
            </div>
        </div>
    );
}
export default Login;