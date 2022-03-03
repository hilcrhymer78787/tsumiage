import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import LoginLayout from '@/layouts/login';
import store from "@/store/index";
import { api } from '@/plugins/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { errorType } from "@/types/api/error";
import { apiUserCreateResponseType } from "@/types/api/user/create/response";
import { apiUserCreateRequestType } from "@/types/api/user/create/request";
import { apiUserBearerAuthenticationResponseType } from "@/types/api/user/bearerAuthentication/response";
import SendIcon from '@material-ui/icons/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import moment from 'moment';
import {
    Avatar,
    Button,
    Box,
    TextField,
    Card,
    CardHeader,
    CardContent,
    CardActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import UserImg from '@/components/common/UserImg';
type Props = {
    onCloseMyself: any
    loginInfo: apiUserBearerAuthenticationResponseType | null
}
CreateUser.getLayout = function getLayout(page: any) {
    return (
        <LoginLayout>{page}</LoginLayout>
    );
};
let inputRef: any = '';
let file: any = '';
function CreateUser(props: Props) {
    const [uploadedImage, setUploadedImage] = useState('' as any);
    const [passwordEditMode, setPasswordEditMode] = useState(true as boolean);
    const [id, setId] = useState(0 as number);
    const [name, setName] = useState("" as string);
    const [nameError, setNameError] = useState("" as string);
    const [email, setEmail] = useState("" as string);
    const [emailError, setEmailError] = useState("" as string);
    const [password, setPassword] = useState("" as string);
    const [passwordError, setPasswordError] = useState("" as string);
    const [user_img, setUserImg] = useState("" as string);
    const [passwordAgain, setPasswordAgain] = useState("" as string);
    const [createUserLoading, setCreateUserLoading] = useState(false as boolean);
    const createUser = async () => {
        if (validation()) {
            return;
        }
        setCreateUserLoading(true);
        const postData: FormData = new FormData();
        if (file) {
            postData.append("file", file);
        }
        postData.append('id', id.toString());
        postData.append('name', name);
        postData.append('email', email);
        postData.append('password', password);
        postData.append('user_img', user_img);
        postData.append('img_oldname', props.loginInfo?.user_img);
        const requestConfig: AxiosRequestConfig = {
            url: `/api/user/create`,
            method: "POST",
            data: postData
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
    const fileSelected = (e: any) => {
        file = e.target.files[0];
        setUserImg(moment().format("YYYYMMDDHHmmss") + file.name);
        const reader: any = new FileReader();
        reader.onload = (e: any) => {
            setUploadedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };
    useEffect(() => {
        if (props.loginInfo) {
            setId(props.loginInfo.id);
            setName(props.loginInfo.name);
            setEmail(props.loginInfo.email);
            setUserImg(props.loginInfo.user_img);
            setPasswordEditMode(false);
            // img_oldname
        }
    }, []);
    return (
        <Card>
            <CardHeader title={props.loginInfo ? 'ユーザー編集' : '新規ユーザー登録'} />
            <CardContent>
                <ul>
                    <li>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: '20px'
                        }}>
                            {Boolean(uploadedImage) &&
                                <Avatar
                                    src={uploadedImage}
                                    sx={{
                                        width: '70px',
                                        height: '70px',
                                        border: '2px solid #1976d2'
                                    }}
                                />
                            }
                            {!Boolean(uploadedImage) &&
                                <UserImg
                                    fileName={props.loginInfo?.user_img}
                                    size="70"
                                />
                            }
                            <Button
                                onClick={() => inputRef.click()}
                                variant="contained"
                                sx={{ ml: '20px' }}
                                color="inherit">画像を選択<FileUploadIcon />
                            </Button>
                            <input
                                onChange={fileSelected}
                                type="file"
                                hidden
                                ref={refParam => inputRef = refParam}
                            />
                        </Box>
                    </li>
                    <li>
                        <Box sx={{ mb: '15px' }}>
                            <TextField
                                onKeyPress={e => { if (e.key === 'Enter') { createUser(); } }}
                                error={Boolean(nameError)}
                                helperText={nameError}
                                value={name}
                                onChange={(e) => { setName(e.currentTarget.value); }}
                                label="名前" variant="outlined" color="primary"
                            />
                        </Box>
                    </li>
                    <li>
                        <Box sx={{ mb: '15px' }}>
                            <TextField
                                onKeyPress={e => { if (e.key === 'Enter') { createUser(); } }}
                                error={Boolean(emailError)}
                                helperText={emailError}
                                value={email}
                                onChange={(e) => { setEmail(e.currentTarget.value); }}
                                label="メールアドレス" variant="outlined" color="primary"
                            />
                        </Box>
                    </li>
                    {passwordEditMode && <>
                        <li>
                            <Box sx={{ mb: '15px' }}>
                                <TextField
                                    onKeyPress={e => { if (e.key === 'Enter') { createUser(); } }}
                                    error={Boolean(passwordError)}
                                    helperText={passwordError}
                                    value={password}
                                    onChange={(e) => { setPassword(e.currentTarget.value); }}
                                    label="パスワード" variant="outlined" color="primary"
                                />
                            </Box>
                        </li>
                        <li>
                            <Box sx={{ mb: '15px' }}>
                                <TextField
                                    onKeyPress={e => { if (e.key === 'Enter') { createUser(); } }}
                                    value={passwordAgain}
                                    onChange={(e) => { setPasswordAgain(e.currentTarget.value); }}
                                    label="パスワード確認" variant="outlined" color="primary"
                                />
                            </Box>
                        </li>
                    </>}
                    {!passwordEditMode && <>
                        <li>
                            <Box sx={{
                                mb: '15px',
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                                <Button
                                    onClick={() => { setPasswordEditMode(true); }}
                                    variant="contained"
                                    color="inherit">パスワードを編集
                                </Button>
                            </Box>
                        </li>
                    </>}
                </ul>
            </CardContent>
            <CardActions>
                {!props.loginInfo &&
                    <Button
                        onClick={() => { Router.push("/login"); }}
                        color="inherit"
                        variant="contained">
                        ログイン画面へ
                    </Button>
                }
                <div></div>
                <LoadingButton
                    onClick={createUser}
                    color="primary"
                    variant="contained"
                    loading={createUserLoading}>
                    登録<SendIcon />
                </LoadingButton>
            </CardActions>
        </Card>
    );
}

export default CreateUser;