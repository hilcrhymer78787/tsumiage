import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { loginInfoAtom } from "@/data/user";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { useUserApi } from "@/data/user";

const Login = ({
  setIsNew,
}: {
  setIsNew: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const setLoginInfo = useSetRecoilState(loginInfoAtom);
  const {
    testAuthentication,
    testAuthenticationLoading,
    basicAuth,
    basicAuthLoading,
  } = useUserApi();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const apiTestAuthentication = async () => {
    try {
      const res = await testAuthentication();
      localStorage.setItem("token", res.data.token);
      setLoginInfo(res.data);
      router.push("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラー");
      }
    }
  };
  const apiBasicAuth = async () => {
    if (validation()) return;
    try {
      const res = await basicAuth({
        email: email,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      setLoginInfo(res.data);
      router.push("/");
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
    if (!/.+@.+\..+/.test(email)) {
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
    <Container sx={{ p: "10px" }} maxWidth="xs">
      <Card>
        <CardHeader title="ログイン" />
        <CardContent>
          <Box sx={{ mb: "15px" }}>
            <TextField
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  apiBasicAuth();
                }
              }}
              error={!!emailError}
              helperText={emailError}
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              label="email"
              variant="outlined"
              color="primary"
            />
          </Box>
          <Box sx={{ mb: "15px" }}>
            <TextField
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  apiBasicAuth();
                }
              }}
              error={!!passwordError}
              helperText={passwordError}
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              label="password"
              variant="outlined"
              color="primary"
            />
          </Box>
          {process.env.NEXT_PUBLIC_IS_SHOW_TEST_USER == "1" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <LoadingButton
                color="inherit"
                variant="contained"
                onClick={apiTestAuthentication}
                loading={testAuthenticationLoading}
                disabled={basicAuthLoading}
              >
                テストユーザーでログイン
                <SendIcon />
              </LoadingButton>
            </Box>
          )}
        </CardContent>
        <CardActions>
          <Button
            onClick={() => setIsNew(true)}
            color="inherit"
            variant="contained"
          >
            新規登録
          </Button>
          <LoadingButton
            color="primary"
            variant="contained"
            onClick={apiBasicAuth}
            loading={basicAuthLoading}
            disabled={testAuthenticationLoading}
          >
            ログイン
            <SendIcon />
          </LoadingButton>
        </CardActions>
      </Card>
    </Container>
  );
};
export default Login;
