import React, { useState, useMemo } from "react";
import Avatar from "@mui/material/Avatar";
import { apiGoalReadResponseGoalsType } from "@/types/api/goal/read/response";
import CreateGoal from "@/components/goal/CreateGoal";
import {
  Dialog,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
type Props = {
  goalRead: () => void,
  goal: apiGoalReadResponseGoalsType
}
export default function GoalItem(props: Props) {
  const theme = useTheme();
  const [createGoalDialog, setCreateGoalDialog] = useState<boolean>(false);
  const limitText = useMemo(() => {
    const limit = dayjs(props.goal.end_date).diff(dayjs(), "days");
    const sumMinute = props.goal.sum_minute;
    const targetMinute = props.goal.minute - sumMinute;
    const deadlineDayCount = props.goal.deadline_day_count;
    if (limit < 0) return "期限を過ぎています";
    if (targetMinute > 0) {
      return `残り${deadlineDayCount}日で${targetMinute}分（${Math.floor((targetMinute) / deadlineDayCount)}分/日）`;
    }
  }, [props]);
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar
            sx={{
              fontSize: "13px",
              bgcolor: props.goal.sum_minute >= props.goal.minute ? theme.palette.primary.main : ""
            }}
          >{Math.floor(props.goal.sum_minute * 100 / props.goal.minute)}%</Avatar>
        </ListItemAvatar>
        <ListItemText
          onClick={() => { setCreateGoalDialog(true); }}
          primary={props.goal.task_name}
          secondary={<span>
            目標:{props.goal.minute}分、実績:{props.goal.sum_minute}分<br />
            {limitText}
          </span>}
        ></ListItemText>
      </ListItemButton>
      <Dialog open={createGoalDialog} onClose={() => { setCreateGoalDialog(false); }}>
        {createGoalDialog && (
          <CreateGoal
            onCloseMyself={() => {
              setCreateGoalDialog(false);
              props.goalRead();
            }}
            focusGoal={props.goal}
          />
        )}
      </Dialog>
    </ListItem>
  );
}
