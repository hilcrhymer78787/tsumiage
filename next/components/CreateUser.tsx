import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { connect } from "react-redux";
import { Button, CircularProgress, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import LoginLayout from '@/layouts/login';
import { apiUserCreateResponseType } from "@/types/api/user/create/response";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from '@/plugins/axios';
import store from "@/store/index";
import { errorType } from "@/types/error";
import { apiUserBearerAuthenticationResponseType } from "@/types/api/user/bearerAuthentication/response";

type Props = {
    onCloseMyself: any
    loginInfo: apiUserBearerAuthenticationResponseType | null
}
CreateUser.getLayout = function getLayout(page: any) {
    return (
        <LoginLayout>{page}</LoginLayout>
    );
};
function CreateUser(props: Props) {
    const [passwordEditMode, setPasswordEditMode] = useState(true as boolean);
    const [id, setId] = useState(0 as number);
    const [name, setName] = useState("" as string);
    const [nameError, setNameError] = useState("" as string);
    const [email, setEmail] = useState("" as string);
    const [emailError, setEmailError] = useState("" as string);
    const [password, setPassword] = useState("" as string);
    const [passwordError, setPasswordError] = useState("" as string);
    const [passwordAgain, setPasswordAgain] = useState("" as string);
    const [createUserLoading, setCreateUserLoading] = useState(false as boolean);
    const createUser = async () => {
        if (validation()) {
            return;
        }
        setCreateUserLoading(true);
        const apiParam = {
            id: id,
            name: name,
            email: email,
            password: password
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/user/create`,
            method: "POST",
            data: apiParam
        };
        await api(requestConfig)
            .then((res: AxiosResponse<apiUserCreateResponseType>) => {
                localStorage.setItem('token', res.data.token);
                store.dispatch({ type: "setLoginInfo", value: res.data });
                props.onCloseMyself();
            })
            .catch((err: AxiosError<errorType>) => {
                if (err.response?.data.errorMessage) {
                    alert(err.response.data.errorMessage);
                } else {
                    alert('登録に失敗しました');
                }
            })
            .finally(() => {
                setCreateUserLoading(false);
            });
    };
    const validation = (): boolean => {
        let isError: boolean = false;
        setEmailError("");
        setPasswordError("");
        setNameError("");
        if (name == "") {
            setNameError("名前は必須です");
            isError = true;
        }
        if (!(/.+@.+\..+/.test(email))) {
            setEmailError("正しい形式で入力してください");
            isError = true;
        }
        if (passwordEditMode) {
            if (password.length < 8) {
                setPasswordError("パスワードは8桁以上で設定してください");
                isError = true;
            }
            if (password != passwordAgain) {
                setPasswordError("パスワードが一致しません");
                isError = true;
            }
        }
        return isError;
    };
    useEffect(() => {
        if (props.loginInfo) {
            setId(props.loginInfo.id);
            setName(props.loginInfo.name);
            setEmail(props.loginInfo.email);
            setPasswordEditMode(false);
        }
    }, []);
    return (
        <div className='card'>
            <div className="card_header">
                <span className="card_header_ttl">新規ユーザー登録</span>
            </div>
            <div className="card_body">
                <ul>
                    <li className='mb-3'>
                        <TextField
                            onKeyPress={e => { if (e.key === 'Enter') { createUser(); } }}
                            error={Boolean(nameError)}
                            helperText={nameError}
                            value={name}
                            onChange={(e) => { setName(e.currentTarget.value); }}
                            label="名前" variant="outlined" color="primary" />
                    </li>
                    <li className='mb-3'>
                        <TextField
                            onKeyPress={e => { if (e.key === 'Enter') { createUser(); } }}
                            error={Boolean(emailError)}
                            helperText={emailError}
                            value={email}
                            onChange={(e) => { setEmail(e.currentTarget.value); }}
                            label="メールアドレス" variant="outlined" color="primary" />
                    </li>
                    {passwordEditMode && <>
                        <li className='mb-3'>
                            <TextField
                                onKeyPress={e => { if (e.key === 'Enter') { createUser(); } }}
                                error={Boolean(passwordError)}
                                helperText={passwordError}
                                value={password}
                                onChange={(e) => { setPassword(e.currentTarget.value); }}
                                label="パスワード" variant="outlined" color="primary" />
                        </li>
                        <li className='mb-3'>
                            <TextField
                                onKeyPress={e => { if (e.key === 'Enter') { createUser(); } }}
                                value={passwordAgain}
                                onChange={(e) => { setPasswordAgain(e.currentTarget.value); }}
                                label="パスワード確認" variant="outlined" color="primary" />
                        </li>
                    </>}
                    {!passwordEditMode && <>
                        <li className='mb-3 d-flex justify-end'>
                            <Button
                                onClick={() => { setPasswordEditMode(true); }}
                                variant="contained"
                            >パスワードを編集</Button>
                        </li>
                    </>}
                </ul>
            </div>
            <div className="card_footer justify-space-between">
                <Button
                    onClick={() => { Router.push("/login"); }}
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