import {
  Box,
  Container,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { ReactNode, useEffect } from "react";

import GroupIcon from "@mui/icons-material/Group";
import NavItem from "@/components/common/NavItem";
import Navigation from "@/components/common/Navigation";
import TaskIcon from "@mui/icons-material/Task";
import TodayIcon from "@mui/icons-material/Today";
import UserAvatar from "@/components/common/UserAvatar";
import dayjs from "dayjs";
import { loginInfoAtom } from "@/data/user";
import theme from "@/plugins/theme";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

export type Nav = {
  ttl: string;
  value: string;
  icon: ReactNode;
};
function Layout({ children }: Props) {
  const router = useRouter();
  const getColor = (value: string) => {
    return router.pathname === value ? theme.palette.primary.main : "white";
  };
  const loginInfo = useRecoilValue(loginInfoAtom);

  const navs: Nav[] = [
    {
      ttl: "task",
      value: "/task",
      icon: <TaskIcon />,
    },
    {
      ttl: "calendar",
      value: "/calendar",
      icon: <TodayIcon />,
    },
    {
      ttl: "friend",
      value: "/friend",
      icon: <GroupIcon />,
    },
    {
      ttl: "mypage",
      value: "/mypage",
      icon: (
        <UserAvatar
          src={loginInfo?.user_img ?? ""}
          size={30}
          onClick={() => {}}
          borderColor={getColor("/mypage")}
        />
      ),
    },
  ];

  const onClickNav = ({ value }: Nav) => {
    if (value == "/calendar") {
      router.push({
        pathname: "calendar",
        query: {
          year: dayjs().format("YYYY"),
          month: dayjs().format("M"),
        },
      });
      return;
    }
    router.push(value);
  };

  useEffect(() => {
    if (!loginInfo) router.push("/auth");
  }, []);

  if (!loginInfo) return <></>;
  return (
    <>
      <Box sx={{ display: "flex" }} data-testid="Dashboard">
        <Drawer variant="permanent">
          <Toolbar>{loginInfo.name}</Toolbar>
          <Divider />
          <List component="nav">
            {navs.map((nav, i) => (
              <ListItemButton key={i} onClick={() => onClickNav(nav)}>
                <ListItemIcon>{nav.icon}</ListItemIcon>
                <ListItemText primary={nav.ttl} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            paddingLeft: "170px",
          }}
        >
          <Container maxWidth="lg" sx={{ my: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
      <Navigation />
    </>
  );
}
export default Layout;
