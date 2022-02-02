import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import { Button, CircularProgress, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import LoginLayout from '../../layouts/login'
import { apiUserBasicAuthenticationRequestType } from "../../types/api/user/basicAuthentication/request"
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from '../../plugins/axios';
import store from "../../store/index";
import { errorType } from "../../types/error"
Login.getLayout = function getLayout(page) {
    return (
        <LoginLayout>{page}</LoginLayout>
    )
}
function Login() {
    const [formUser, setFormUser] = useState({
        email: "" as string,
        password: "" as string,
    })
    const [basicAuthenticationLoading, setBasicAuthenticationLoading] = useState(false as boolean)
    const testAuthentication = async () => {
        const requestConfig: AxiosRequestConfig = {
            url: `/api/user/test_authentication`,
            method: "GET",
        };
        await api(requestConfig)
            .then((res: AxiosResponse) => {
                localStorage.setItem('token', res.data.token);
                store.dispatch({ type: "setLoginInfo", value: res.data })
            })
    }
    const basicAuthentication = async () => {
        setBasicAuthenticationLoading(true)
        const apiParam: apiUserBasicAuthenticationRequestType = {
            email: formUser.email,
            password: formUser.password
        }
        const requestConfig: AxiosRequestConfig = {
            url: `/api/user/basic_authentication`,
            method: "POST",
            data: apiParam
        };
        await api(requestConfig)
            .then((res: AxiosResponse) => {
                localStorage.setItem('token', res.data.token);
                store.dispatch({ type: "setLoginInfo", value: res.data })
            })
            .catch((err: AxiosError<errorType>) => {
                if (err.response?.data.errorMessage) {
                    alert(err.response.data.errorMessage)
                }
            })
            .finally(() => {
                setBasicAuthenticationLoading(false)
            })
    }
    return (
        <div className='card'>
            {formUser && <>
                <div className="card_header">
                    <span className="card_header_ttl">ログイン</span>
                </div>
                <div className="card_body">
                    <ul>
                        <li className='mb-3'>
                            <TextField
                                value={formUser.email}
                                onChange={(e) => { setFormUser({ ...formUser, email: e.currentTarget.value }) }}
                                label="email" variant="outlined" color="primary" />
                        </li>
                        <li className='mb-3'>
                            <TextField
                                value={formUser.password}
                                onChange={(e) => { setFormUser({ ...formUser, password: e.currentTarget.value }) }}
                                label="password" variant="outlined" color="primary" />
                        </li>
                    </ul>
                    <div className='d-flex justify-end'>
                        <Button onClick={testAuthentication} variant="contained">テストユーザーでログイン</Button>
                    </div>
                </div>
                <div className="card_footer justify-space-between">
                    <Button
                        onClick={() => { Router.push("/login/new") }}
                        variant="contained">新規登録</Button>
                    <Button color="primary"
                        onClick={basicAuthentication}
                        variant="contained"
                        endIcon={basicAuthenticationLoading ? <CircularProgress size={25} /> : <SendIcon />}
                        disabled={basicAuthenticationLoading}
                    >ログイン</Button>
                </div>
            </>}
        </div>
    );
}
export default Login;