import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Breakpoint,
  Container,
  Drawer,
  List,
  Paper,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import { ReactNode, useState } from "react";
import TaskIcon from "@mui/icons-material/Task";
import TodayIcon from "@mui/icons-material/Today";
import UserImg from "@/components/common/UserImg";
import dayjs from "dayjs";
import theme from "@/plugins/theme";
import { useMedia } from "@/data/media/useMedia";
import { useRouter } from "next/router";
import Auth from "@/components/common/Auth";
import AuthNew from "@/components/common/AuthNew";
import { useLoginInfo } from "@/data/common/useLoginInfo";

export type Nav = {
  label: string;
  value: string;
  icon: ReactNode;
};
export const NAV_WIDTH = 180;

const Layout = ({
  children,
  pcMaxWidth = "lg",
  spP = "10px 10px 180px",
  pcP = "20px",
}: {
  children: ReactNode;
  authRequired?: boolean;
  pcMaxWidth?: Breakpoint | false;
  spP?: string;
  pcP?: string;
}) => {
  const { isPc } = useMedia();
  const router = useRouter();
  const [isNew, setIsNew] = useState(false);
  const { loginInfo } = useLoginInfo();
  const getColor = (value: string) => {
    return router.pathname === value ? theme.palette.primary.main : "white";
  };

  const onChangeNav = (value: string) => {
    if (value == "/calendar") {
      router.push({
        pathname: "/calendar",
        query: {
          year: dayjs().format("YYYY"),
          month: dayjs().format("M"),
        },
      });
      return;
    }
    router.push(value);
  };

  const navs: Nav[] = [
    {
      label: "タスク",
      value: "/task",
      icon: <TaskIcon />,
    },
    {
      label: "カレンダー",
      value: "/calendar",
      icon: <TodayIcon />,
    },
    {
      label: "友達",
      value: "/friend",
      icon: <GroupIcon />,
    },
    {
      label: "マイページ",
      value: "/mypage",
      icon: <UserImg fileName={loginInfo?.user_img} size="30" borderColor={getColor("/mypage")} />,
    },
  ];

  if (!loginInfo) return isNew ? <AuthNew setIsNew={setIsNew} /> : <Auth setIsNew={setIsNew} />;

  if (isPc) {
    return (
      <Box sx={{ display: "flex" }} data-testid="Dashboard">
        <Drawer variant="permanent">
          <List component="nav" sx={{ width: `${NAV_WIDTH}px` }}>
            {navs.map((nav, i) => {
              const color = getColor(nav.value);
              return (
                <ListItemButton
                  onClick={() => onChangeNav(nav.value)}
                  data-testid={`NavItem-${i}`}
                  key={i}
                >
                  <ListItemIcon sx={{ color }}>{nav.icon}</ListItemIcon>
                  <ListItemText sx={{ color }} primary={nav.label} />
                </ListItemButton>
              );
            })}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, paddingLeft: `${NAV_WIDTH}px` }}>
          <Container maxWidth={pcMaxWidth} sx={{ my: 0, p: pcP }}>
            {children}
          </Container>
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Container sx={{ p: spP }}>{children}</Container>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={router.pathname}
          onChange={(_, value) => onChangeNav(value)}
        >
          {navs.map((nav, i) => (
            <BottomNavigationAction key={i} label={nav.label} value={nav.value} icon={nav.icon} />
          ))}
        </BottomNavigation>
      </Paper>
    </>
  );
};
export default Layout;
