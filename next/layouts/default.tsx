import Router from 'next/router'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import Navigation from "../components/Navigation";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from '../plugins/axios';
import store from "../store/index";
import axios from 'axios'
import { apiUserBearerAuthenticationResponseType } from "../types/api/user/bearerAuthentication/response"
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';

const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
        count: state.count,
        post: state.post
    };
};
function Layout({ dispatch, children, loginInfo }) {
    const testAuthentication = async () => {
        const requestConfig: AxiosRequestConfig = {
            url: `/api/user/test_authentication`,
            method: "GET",
        };
        await api(requestConfig)
            .then((res: AxiosResponse) => {
                localStorage.setItem('token', res.data.token);
                // bearerAuthentication
            })
    }
    const logout = () => {
        localStorage.removeItem("token")
        Router.push("/login")
        dispatch({ type: "setLoginInfo", value: false })
    }
    return (
        <>
            {loginInfo && <>
                <header>
                    <div>{loginInfo.name}</div>
                    <Button onClick={logout} variant="contained" color="primary">ログアウト</Button>
                </header>
                <main>{children}</main>
                <Navigation />
            </>}
        </>
    )
}
export default connect(mapStateToProps)(Layout);
