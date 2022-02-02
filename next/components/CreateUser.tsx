import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import { connect } from "react-redux";
import { Button, CircularProgress, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import LoginLayout from '../layouts/login'
import { apiUserCreateResponseType } from "../types/api/user/create/response"
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from '../plugins/axios';
import store from "../store/index";
import { errorType } from "../types/error"

const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
        count: state.count,
        post: state.post
    };
};
CreateUser.getLayout = function getLayout(page) {
    return (
        <LoginLayout>{page}</LoginLayout>
    )
}
function CreateUser({ dispatch, count, post, loginInfo }: any) {
    const [formUser, setFormUser] = useState({
        name: "" as string,
        email: "" as string,
        password: "" as string,
        user_img: "https://i.picsum.photos/id/30/500/300.jpg?hmac=p1-iOhnRmBgus54WChFXINxaQuqvFO-q0wegbZjjLo0" as string,
    })
    const [createUserLoading, setCreateUserLoading] = useState(false as boolean)
    const createUser = async () => {
        setCreateUserLoading(true)
        const apiParam = {
            name: formUser.name,
            email: formUser.email,
            password: formUser.password
        }
        const requestConfig: AxiosRequestConfig = {
            url: `/api/user/create`,
            method: "POST",
            data: apiParam
        };
        await api(requestConfig)
            .then((res: AxiosResponse<apiUserCreateResponseType>) => {
                localStorage.setItem('token', res.data.token);
                store.dispatch({ type: "setLoginInfo", value: res.data })
            })
            .catch((err: AxiosError<errorType>) => {
                if (err.response?.data.errorMessage) {
                    alert(err.response.data.errorMessage)
                }
            })
            .finally(() => {
                setCreateUserLoading(false)
            })
    }
    return (
        <div className='card'>
            <div className="card_header">
                <span className="card_header_ttl">新規ユーザー登録</span>
            </div>
            <div className="card_body">
                <ul>
                    <li className='mb-3'>
                        <TextField
                            value={formUser.name}
                            onChange={(e) => { setFormUser({ ...formUser, name: e.currentTarget.value }) }}
                            label="name" variant="outlined" color="primary" />
                    </li>
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
            </div>
            <div className="card_footer justify-space-between">
                <Button
                    onClick={() => { Router.push("/login") }}
                    variant="contained">ログイン画面へ</Button>
                <Button color="primary"
                    onClick={createUser}
                    variant="contained"
                    endIcon={createUserLoading ? <CircularProgress size={25} /> : <SendIcon />}
                    disabled={createUserLoading}
                >登録</Button>
            </div>
        </div>
    );
}

export default CreateUser;