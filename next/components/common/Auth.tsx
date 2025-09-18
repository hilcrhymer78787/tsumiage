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
import { Dispatch, SetStateAction, useState } from "react";

import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useTestAuth } from "@/data/user/useTestAuth";
import { useBasicAuth } from "@/data/user/useBasicAuth";

const Login = ({
  setIsNew,
}: {
  setIsNew: Dispatch<SetStateAction<boolean>>;
}) => {
  const { basicAuth, isLoading: basicAuthLoading } = useBasicAuth();
  const { testAuth, isLoading: testAuthLoading } = useTestAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const apiBasicAuth = async () => {
    if (validation()) return;
    const res = await basicAuth({
      email: email,
      password: password,
    });
    if (!res) alert("失敗しました");
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
                if (e.key === "Enter") apiBasicAuth();
              }}
              error={!!emailError}
              helperText={emailError}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              label="email"
            />
          </Box>
          <Box sx={{ mb: "15px" }}>
            <TextField
              onKeyPress={(e) => {
                if (e.key === "Enter") apiBasicAuth();
              }}
              error={!!passwordError}
              helperText={passwordError}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              label="password"
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
                onClick={testAuth}
                loading={testAuthLoading}
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
            variant="contained"
            onClick={apiBasicAuth}
            loading={basicAuthLoading}
            disabled={testAuthLoading}
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
