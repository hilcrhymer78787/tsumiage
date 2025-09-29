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
import { useState } from "react";

import CreateUser from "@/components/user/CreateUser";
import Layout from "@/layouts/default";
import UserImg from "@/components/common/UserImg";
import { useLoginInfo } from "@/data/common/useLoginInfo";

const Mypage = () => {
  const { loginInfo, logout } = useLoginInfo();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <Button onClick={() => setIsOpen(true)} variant="contained">
            編集
          </Button>
        </CardActions>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          {isOpen && <CreateUser loginInfo={loginInfo} onCloseMyself={() => setIsOpen(false)} />}
        </Dialog>
      </Card>
    </Layout>
  );
};
export default Mypage;
