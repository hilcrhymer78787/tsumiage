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
import Layout from "@/layouts/default";
import UserImg from "@/components/common/UserImg";
import { loginInfoAtom } from "@/data/user";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useBearerAuth } from "@/data/user/useBearerAuth";

const Mypage = () => {
  const router = useRouter();
  const loginInfo = useRecoilValue(loginInfoAtom);
  const [createUserDialog, setCreateUserDialog] = useState<boolean>(false);
  const { logout } = useBearerAuth();

  const onClickLogout = () => {
    if (!confirm("ログアウトしますか？")) return;
    logout();
  };
  return (
    <Layout>
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
          <Button onClick={onClickLogout} color="inherit" variant="contained">
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
    </Layout>
  );
};
export default Mypage;
