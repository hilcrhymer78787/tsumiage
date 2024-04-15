import { BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import GroupIcon from "@mui/icons-material/Group";
import TaskIcon from "@mui/icons-material/Task";
import TodayIcon from "@mui/icons-material/Today";
import UserAvatar from "@/components/common/UserAvatar";
import dayjs from "dayjs";
import { loginInfoAtom } from "@/data/user";
import theme from "@/plugins/theme";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

const Navigation = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const router = useRouter();
  const getColor = (value: string) => {
    return router.pathname === value ? theme.palette.primary.main : "white";
  };
  const onChangeNav = (val: string) => {
    if (val == "/calendar") {
      router.push({
        pathname: "calendar",
        query: {
          year: dayjs().format("YYYY"),
          month: dayjs().format("M"),
        },
      });
      return;
    }
    router.push(val);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={router.pathname}
        onChange={(_, val) => onChangeNav(val)}
      >
        <BottomNavigationAction
          label="task"
          value="/task"
          icon={<TaskIcon />}
        />
        <BottomNavigationAction
          label="calendar"
          value="/calendar"
          icon={<TodayIcon />}
        />
        <BottomNavigationAction
          label="friend"
          value="/friend"
          icon={<GroupIcon />}
        />
        <BottomNavigationAction
          label="mypage"
          value="/mypage"
          icon={
            <UserAvatar
              src={loginInfo?.user_img ?? ""}
              size={30}
              onClick={() => {}}
              borderColor={getColor("/mypage")}
            />
          }
        />
      </BottomNavigation>
    </Paper>
  );
};
export default Navigation;
