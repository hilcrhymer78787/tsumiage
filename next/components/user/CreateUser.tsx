import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";

import ErrTxt from "@/components/common/ErrTxt";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useCreateUser } from "@/data/user/useCreateUser";
import { useDeleteUser } from "@/data/user/useDeleteUser";
import { LoginInfo } from "@/data/types/loginInfo";
import RStack from "@/components/common/RStack";
import FileUploader from "@/components/common/FileUploader";
import { useLoginInfo } from "@/data/common/useLoginInfo";

const CreateUser = ({
  onCloseMyself,
  loginInfo,
  setIsNew,
}: {
  onCloseMyself: () => void;
  loginInfo: LoginInfo | null;
  setIsNew?: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    message,
    emailError,
    nameError,
    passwordError,
    createUser,
    isLoading: createLoading,
  } = useCreateUser();
  const { deleteUser, error: deleteError, isLoading: deleteLoading } = useDeleteUser();
  const [passwordEditMode, setPasswordEditMode] = useState(!loginInfo);
  const [name, setName] = useState(loginInfo?.name ?? "");
  const [email, setEmail] = useState(loginInfo?.email ?? "");
  const [image, setImage] = useState(loginInfo?.user_img ?? "");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { logout } = useLoginInfo();

  const apiCreateUser = async () => {
    const res = await createUser({
      id: loginInfo?.id ?? 0,
      name,
      email,
      password,
      user_img: image,
      passwordAgain,
      file,
      passwordEditMode,
    });
    if (res) onCloseMyself();
  };

  const onClickDeleteUser = async () => {
    if (!loginInfo) return;
    if (!confirm(`「${loginInfo.name}」さんを削除しますか？`)) return;
    if (!confirm("関連する全データも削除されますが、よろしいですか？")) return;
    const res = await deleteUser();
    if (!!res) logout();
  };

  const onKeyDown = (e?: KeyboardEvent<HTMLDivElement>) => {
    if (e?.key === "Enter") apiCreateUser();
  };

  const title = loginInfo ? "ユーザー編集" : "新規ユーザー登録";

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Stack gap={3}>
          <FileUploader image={image} setImage={setImage} setFile={setFile} />
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
          {passwordEditMode ? (
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
          ) : (
            <RStack justifyContent="flex-end">
              <Button onClick={() => setPasswordEditMode(true)}>パスワードを編集</Button>
            </RStack>
          )}
          <ErrTxt txt={message} p={0} />
          <ErrTxt txt={deleteError} />
        </Stack>
      </DialogContent>
      <DialogActions>
        {!!setIsNew && (
          <Button onClick={() => setIsNew(false)} color="inherit" variant="contained">
            ログイン画面へ
          </Button>
        )}
        {!!loginInfo && (
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
        <Box />
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
