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
function LoginLayout({ dispatch, children, loginInfo }) {
    return (
        <>
            {loginInfo === false && <>
                <header>ログインページ</header>
                <main>{children}</main>
            </>}
        </>
    )
}
export default connect(mapStateToProps)(LoginLayout);
