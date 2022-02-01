import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Button from '@material-ui/core/Button';
import { api } from '../plugins/axios';

function Auth() {
    const testAuthentication = async () => {
        const requestConfig: AxiosRequestConfig = {
            url: `/api/user/test_authentication`,
            method: "GET",
        };
        await api(requestConfig)
            .then((res: AxiosResponse) => {
                localStorage.setItem('token', res.data.token);
            })
            .catch((err: AxiosError) => {
                console.log(err.response)
            })
            .finally(() => {
            });
    }
    return (
        <>
            <Button onClick={testAuthentication} variant="contained" color="primary">テストユーザーでログイン</Button>
        </>
    )
}
export default Auth;