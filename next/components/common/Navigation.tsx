import { BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
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
  const [value, setValue] = useState(router.pathname);
  const getColor = (value: string) => {
    return router.pathname === value ? theme.palette.primary.main : "white";
  };
  const nowYear = () => {
    return Number(dayjs().format("YYYY"));
  };
  const nowMonth = () => {
    return Number(dayjs().format("M"));
  };
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          router.push(newValue);
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="task"
          value="/task"
          icon={<TaskIcon />}
        />
        <BottomNavigationAction
          label="calendar"
          value={`/calendar?year=${nowYear()}&month=${nowMonth()}`}
          icon={<TodayIcon />}
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
        {/* <BottomNavigationAction
          label="goal"
          value="/goal"
          icon={<SportsScoreIcon />} />
        <BottomNavigationAction
          label="friend"
          value="/friend"
          icon={<GroupIcon />} /> */}
      </BottomNavigation>
    </Paper>
  );
};
export default Navigation;
