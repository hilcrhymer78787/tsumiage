import React, { useState } from "react";
import Router from "next/router";
import SendIcon from "@mui/icons-material/Send";
import LoginLayout from "@/layouts/login";
import store from "@/store/index";
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
import { useUserApi } from "@/data/user";
import axios from "axios";
function Login () {
  const { testAuthentication, testAuthenticationLoading, basicAuthentication, basicAuthenticationLoading } = useUserApi();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const apiTestAuthentication = async () => {
    try {
      const res = await testAuthentication();
      localStorage.setItem("token", res.data.token);
      store.dispatch({ type: "setLoginInfo", value: res.data });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラー");
      }
    }
  };
  const apiBasicAuthentication = async () => {
    if (validation()) return;
    try {
      const res = await basicAuthentication({
        email: email,
        password: password
      });
      localStorage.setItem("token", res.data.token);
      store.dispatch({ type: "setLoginInfo", value: res.data });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data.errorMessage) {
          alert(e.response.data.errorMessage);
        } else {
          alert(`${e?.response?.status}：${e?.response?.statusText}`);
        }
      } else {
        alert("予期せぬエラー");
      }
    }
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
    <LoginLayout>
      <Card>
        <CardHeader title="ログイン" />
        <CardContent>
          <ul>
            <li>
              <Box sx={{ mb: "15px" }}>
                <TextField
                  onKeyPress={e => { if (e.key === "Enter") { apiBasicAuthentication(); } }}
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
                  onKeyPress={e => { if (e.key === "Enter") { apiBasicAuthentication(); } }}
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
                    onClick={apiTestAuthentication}
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
            onClick={apiBasicAuthentication}
            loading={basicAuthenticationLoading}
            disabled={testAuthenticationLoading}>
            ログイン<SendIcon />
          </LoadingButton>
        </CardActions>
      </Card>
    </LoginLayout>
  );
}
export default Login;