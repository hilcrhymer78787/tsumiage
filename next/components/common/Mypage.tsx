import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";

import CreateUser from "@/components/user/CreateUser";
import UserImg from "@/components/common/UserImg";
import { loginInfoAtom } from "@/data/user";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

const Mypage = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const router = useRouter();
  const [createUserDialog, setCreateUserDialog] = useState<boolean>(false);
  const logout = () => {
    if (!confirm("ログアウトしますか？")) return;
    router.push("/logout");
  };
  return (
    <Card>
      <CardHeader title="マイページ" />
      <CardContent>
        <ListItem sx={{ p: 0 }}>
          <ListItemAvatar>
            <UserImg fileName={loginInfo?.user_img} size="70" />
          </ListItemAvatar>
          <ListItemText
            sx={{ ml: "15px" }}
            primary={loginInfo?.name}
            secondary={loginInfo?.email}
          />
        </ListItem>
      </CardContent>
      <CardActions>
        <Button onClick={logout} color="inherit" variant="contained">
          ログアウト
        </Button>
        <Button
          onClick={() => setCreateUserDialog(true)}
          color="primary"
          variant="contained"
        >
          編集
        </Button>
      </CardActions>
      <Dialog
        open={createUserDialog}
        onClose={() => setCreateUserDialog(false)}
      >
        {createUserDialog && (
          <CreateUser
            loginInfo={loginInfo}
            onCloseMyself={() => setCreateUserDialog(false)}
          />
        )}
      </Dialog>
    </Card>
  );
};
export default Mypage;
