import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

import ErrTxt from "@/components/common/ErrTxt";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import UserImg from "@/components/common/UserImg";
import { apiUserBearerAuthenticationResponseType } from "@/types/api/user/bearerAuthentication/response";
import axios from "axios";
import dayjs from "dayjs";
import { loginInfoAtom } from "@/data/user";
import { useDeleteUser } from "@/data/user/useDeleteUser";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { useUserApi } from "@/data/user";

type Props = {
  onCloseMyself: () => void;
  loginInfo: apiUserBearerAuthenticationResponseType | null;
};
let inputRef: HTMLInputElement | null = null;
let file: File;
function CreateUser(props: Props) {
  const router = useRouter();

  const setLoginInfo = useSetRecoilState(loginInfoAtom);
  const { createUser, createUserLoading } = useUserApi();
  const { deleteUser, deleteUserError, deleteUserLoading } = useDeleteUser();
  const [uploadedImage, setUploadedImage] = useState<any>("");
  const [passwordEditMode, setPasswordEditMode] = useState<boolean>(true);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [user_img, setUserImg] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const apiCreateUser = async () => {
    if (validation()) return;
    const postData: FormData = new FormData();
    if (file) {
      postData.append("file", file);
    }
    postData.append("id", id.toString());
    postData.append("name", name);
    postData.append("email", email);
    postData.append("password", password);
    postData.append("user_img", user_img);
    postData.append("img_oldname", props.loginInfo?.user_img ?? "");
    try {
      const res = await createUser(postData);
      localStorage.setItem("token", res.data.token);
      setLoginInfo(res.data);
      props.onCloseMyself();
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
    setNameError("");
    if (name == "") {
      setNameError("名前は必須です");
      isError = true;
    }
    if (!/.+@.+\..+/.test(email)) {
      setEmailError("正しい形式で入力してください");
      isError = true;
    }
    if (passwordEditMode) {
      if (password != passwordAgain) {
        setPasswordError("パスワードが一致しません");
        isError = true;
      }
      if (password.length < 8) {
        setPasswordError("パスワードは8桁以上で設定してください");
        isError = true;
      }
    }
    return isError;
  };
  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    file = e.target.files[0];
    setUserImg(dayjs().format("YYYYMMDDHHmmss") + file.name);
    const reader: FileReader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setUploadedImage(e.target?.result);
    };
    reader.readAsDataURL(file);
  };
  const onClickDeleteUser = async () => {
    if (!props.loginInfo) return;
    if (!confirm(`「${props.loginInfo.name}」さんを削除しますか？`)) return;
    if (!confirm("関連する全データも削除されますが、よろしいですか？")) return;
    const res = await deleteUser(props.loginInfo.id);
    if (res) router.push("/auth");
  };

  const onKeyDown = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e?.keyCode !== 13) return;
    apiCreateUser();
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
  }, [props.loginInfo]);
  return (
    <Card>
      <CardHeader
        title={props.loginInfo ? "ユーザー編集" : "新規ユーザー登録"}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: "20px",
          }}
        >
          {!!uploadedImage && (
            <Avatar
              src={uploadedImage}
              sx={{
                width: "70px",
                height: "70px",
                border: "2px solid #1976d2",
              }}
            />
          )}
          {!uploadedImage && (
            <UserImg fileName={props.loginInfo?.user_img} size="70" />
          )}
          <Button
            onClick={() => inputRef?.click()}
            variant="contained"
            sx={{ ml: "20px" }}
            color="inherit"
          >
            画像を選択
            <FileUploadIcon />
          </Button>
          <input
            onChange={fileSelected}
            type="file"
            hidden
            ref={(refParam) => (inputRef = refParam)}
          />
        </Box>
        <Box sx={{ mb: "15px" }}>
          <TextField
            onKeyDown={onKeyDown}
            error={!!nameError}
            helperText={nameError}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            label="名前"
            variant="outlined"
            color="primary"
          />
        </Box>
        <Box sx={{ mb: "15px" }}>
          <TextField
            onKeyDown={onKeyDown}
            error={!!emailError}
            helperText={emailError}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            label="メールアドレス"
            variant="outlined"
            color="primary"
          />
        </Box>
        {passwordEditMode && (
          <>
            <Box sx={{ mb: "15px" }}>
              <TextField
                onKeyDown={onKeyDown}
                error={!!passwordError}
                helperText={passwordError}
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                label="パスワード"
                variant="outlined"
                color="primary"
              />
            </Box>
            <Box sx={{ mb: "15px" }}>
              <TextField
                onKeyDown={onKeyDown}
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.currentTarget.value)}
                label="パスワード確認"
                variant="outlined"
                color="primary"
              />
            </Box>
          </>
        )}
        {!passwordEditMode && (
          <>
            <Box
              sx={{
                mb: "15px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => setPasswordEditMode(true)}
                variant="contained"
                color="inherit"
              >
                パスワードを編集
              </Button>
            </Box>
          </>
        )}
        <ErrTxt txt={deleteUserError} />
      </CardContent>
      <CardActions>
        {!props.loginInfo && (
          <Button
            onClick={() => router.push("/auth")}
            color="inherit"
            variant="contained"
          >
            ログイン画面へ
          </Button>
        )}
        {props.loginInfo && (
          <LoadingButton
            onClick={onClickDeleteUser}
            loading={deleteUserLoading}
            disabled={createUserLoading}
            color="error"
            variant="contained"
          >
            ユーザー削除
          </LoadingButton>
        )}
        {/* deleteUserLoading */}
        <Box></Box>
        <LoadingButton
          onClick={apiCreateUser}
          loading={createUserLoading}
          disabled={deleteUserLoading}
          color="primary"
          variant="contained"
        >
          登録
          <SendIcon />
        </LoadingButton>
      </CardActions>
    </Card>
  );
}

export default CreateUser;
