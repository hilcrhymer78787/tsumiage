import React, { useState } from "react";
import Router from "next/router";
import SendIcon from "@material-ui/icons/Send";
import LoginLayout from "@/layouts/login";
import { apiUserBasicAuthenticationRequestType } from "@/types/api/user/basicAuthentication/request";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from "@/plugins/axios";
import store from "@/store/index";
import { errorType } from "@/types/api/error";
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
Login.getLayout = function getLayout (page: any) {
    return (
        <LoginLayout>{page}</LoginLayout>
    );
};
function Login () {
    const [email, setEmail] = useState("" as string);
    const [emailError, setEmailError] = useState("" as string);
    const [password, setPassword] = useState("" as string);
    const [passwordError, setPasswordError] = useState("" as string);
    const [basicAuthenticationLoading, setBasicAuthenticationLoading] = useState(false as boolean);
    const [testAuthenticationLoading, setTestAuthenticationLoading] = useState(false as boolean);
    const testAuthentication = async () => {
        const requestConfig: AxiosRequestConfig = {
            url: "/api/user/test_authentication",
            method: "GET",
        };
        setTestAuthenticationLoading(true);
        await api(requestConfig)
            .then((res: AxiosResponse) => {
                localStorage.setItem("token", res.data.token);
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
            url: "/api/user/basic_authentication",
            method: "POST",
            data: apiParam
        };
        await api(requestConfig)
            .then((res: AxiosResponse) => {
                localStorage.setItem("token", res.data.token);
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
        <Card>
            <CardHeader title="ログイン" />
            <CardContent>
                <ul>
                    <li>
                        <Box sx={{ mb: "15px" }}>
                            <TextField
                                onKeyPress={e => { if (e.key === "Enter") { basicAuthentication(); } }}
                                error={Boolean(emailError)}
                                helperText={emailError}
                                value={email}
                                onChange={(e) => { setEmail(e.currentTarget.value); }}
                                label="email" variant="outlined" color="primary"
                            />
                        </Box>
                    </li>
                    <li>
                        <Box sx={{ mb: "15px" }}>
                            <TextField
                                onKeyPress={e => { if (e.key === "Enter") { basicAuthentication(); } }}
                                error={Boolean(passwordError)}
                                helperText={passwordError}
                                value={password}
                                onChange={(e) => { setPassword(e.currentTarget.value); }}
                                label="password" variant="outlined" color="primary"
                            />
                        </Box>
                    </li>
                    {process.env.NEXT_PUBLIC_IS_SHOW_TEST_USER == "1" &&
                        <li>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "flex-end"
                            }}>
                                <LoadingButton
                                    color="inherit"
                                    variant="contained"
                                    onClick={testAuthentication}
                                    loading={testAuthenticationLoading}
                                    disabled={basicAuthenticationLoading}>
                                    テストユーザーでログイン<SendIcon />
                                </LoadingButton>
                            </Box>
                        </li>
                    }
                </ul>
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => { Router.push("/login/new"); }}
                    color="inherit"
                    variant="contained">
                    新規登録
                </Button>
                <LoadingButton
                    color="primary"
                    variant="contained"
                    onClick={basicAuthentication}
                    loading={basicAuthenticationLoading}
                    disabled={testAuthenticationLoading}>
                    ログイン<SendIcon />
                </LoadingButton>
            </CardActions>
        </Card>
    );
}
export default Login;