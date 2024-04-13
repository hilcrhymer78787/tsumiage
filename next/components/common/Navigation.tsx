import { BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import GroupIcon from "@mui/icons-material/Group";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import TaskIcon from "@mui/icons-material/Task";
import TodayIcon from "@mui/icons-material/Today";
import dayjs from "dayjs";
import { useRouter } from "next/router";
const Navigation = () => {
  const router = useRouter();
  const [value, setValue] = useState(router.pathname);
  const nowYear = (): number => Number(dayjs().format("YYYY"));
  const nowMonth = (): number => Number(dayjs().format("M"));
  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
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
          icon={<TaskIcon />} />
        {/* <BottomNavigationAction
          label="calendar"
          value={`/calendar?year=${nowYear()}&month=${nowMonth()}`}
          icon={<TodayIcon />} /> */}
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