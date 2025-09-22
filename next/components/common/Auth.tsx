import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";

import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useTestAuth } from "@/data/user/useTestAuth";
import { useBasicAuth } from "@/data/user/useBasicAuth";
import RStack from "./RStack";

const Login = ({
  setIsNew,
}: {
  setIsNew: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    basicAuth,
    isLoading: basicAuthLoading,
    emailError,
    passwordError,
  } = useBasicAuth();
  const { testAuth, isLoading: testAuthLoading } = useTestAuth();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const apiBasicAuth = () => {
    basicAuth({ email, password });
  };

  const onKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") apiBasicAuth();
  };

  return (
    <Container sx={{ p: "10px" }} maxWidth="xs">
      <Card>
        <CardHeader title="ログイン" />
        <Stack gap={3} p={3}>
          <TextField
            onKeyPress={onKeyPress}
            error={!!emailError}
            helperText={emailError}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            label="email"
          />
          <TextField
            onKeyPress={onKeyPress}
            error={!!passwordError}
            helperText={passwordError}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            label="password"
          />
          {process.env.NEXT_PUBLIC_IS_SHOW_TEST_USER == "1" && (
            <RStack justifyContent="flex-end">
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
            </RStack>
          )}
        </Stack>
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
