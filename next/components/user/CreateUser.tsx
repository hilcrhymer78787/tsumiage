import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import ErrTxt from "@/components/common/ErrTxt";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import UserImg from "@/components/common/UserImg";
import { useCreateUser } from "@/data/user/useCreateUser";
import dayjs from "dayjs";
import { useDeleteUser } from "@/data/user/useDeleteUser";
import { LoginInfo } from "@/data/common/useLoginInfo";
import RStack from "@/components/common/RStack";

let inputRef: HTMLInputElement | null = null;
let file: File;

const CreateUser = ({
  onCloseMyself,
  loginInfo,
  setIsNew,
}: {
  onCloseMyself: () => void;
  loginInfo: LoginInfo | null;
  setIsNew?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { createUser, isLoading: createLoading } = useCreateUser();
  const {
    deleteUser,
    error: deleteError,
    isLoading: deleteLoading,
  } = useDeleteUser();
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
    if (file) postData.append("file", file);
    postData.append("id", id.toString());
    postData.append("name", name);
    postData.append("email", email);
    postData.append("password", password);
    postData.append("user_img", user_img);
    postData.append("img_oldname", loginInfo?.user_img ?? "");
    const res = await createUser(postData);
    if (res) onCloseMyself();
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
    if (!loginInfo) return;
    if (!confirm(`「${loginInfo.name}」さんを削除しますか？`)) return;
    if (!confirm("関連する全データも削除されますが、よろしいですか？")) return;
    await deleteUser(loginInfo.id);
  };

  const onKeyDown = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e?.keyCode === 13) apiCreateUser();
  };

  const title = loginInfo ? "ユーザー編集" : "新規ユーザー登録";

  useEffect(() => {
    if (loginInfo) {
      setId(loginInfo.id);
      setName(loginInfo.name);
      setEmail(loginInfo.email);
      setUserImg(loginInfo.user_img);
      setPasswordEditMode(false);
    }
  }, [loginInfo]);
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <RStack gap={3}>
            {!!uploadedImage ? (
              <Avatar
                src={uploadedImage}
                sx={{
                  width: "70px",
                  height: "70px",
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              />
            ) : (
              <UserImg fileName={loginInfo?.user_img} size="70" />
            )}
            <Button onClick={() => inputRef?.click()}>
              画像を選択
              <FileUploadIcon />
            </Button>
            <input
              onChange={fileSelected}
              type="file"
              hidden
              ref={(refParam) => (inputRef = refParam)}
            />
          </RStack>
          <TextField
            onKeyDown={onKeyDown}
            error={!!nameError}
            helperText={nameError}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            label="名前"
          />
          <TextField
            onKeyDown={onKeyDown}
            error={!!emailError}
            helperText={emailError}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            label="メールアドレス"
          />
          {passwordEditMode && (
            <>
              <TextField
                onKeyDown={onKeyDown}
                error={!!passwordError}
                helperText={passwordError}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                label="パスワード"
              />
              <TextField
                onKeyDown={onKeyDown}
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.currentTarget.value)}
                label="パスワード確認"
              />
            </>
          )}
          {!passwordEditMode && (
            <RStack justifyContent="flex-end">
              <Button onClick={() => setPasswordEditMode(true)}>
                パスワードを編集
              </Button>
            </RStack>
          )}
          <ErrTxt txt={deleteError} />
        </Stack>
      </DialogContent>
      <DialogActions>
        {!!setIsNew && (
          <Button
            onClick={() => setIsNew(false)}
            color="inherit"
            variant="contained"
          >
            ログイン画面へ
          </Button>
        )}
        {loginInfo && (
          <LoadingButton
            onClick={onClickDeleteUser}
            loading={deleteLoading}
            disabled={createLoading}
            color="error"
            variant="contained"
          >
            ユーザー削除
          </LoadingButton>
        )}
        <Box></Box>
        <LoadingButton
          onClick={apiCreateUser}
          loading={createLoading}
          disabled={deleteLoading}
          variant="contained"
        >
          登録
          <SendIcon />
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default CreateUser;
