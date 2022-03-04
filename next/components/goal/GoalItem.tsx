import { useState } from "react";
import * as React from "react";
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
import moment from "moment";
type Props = {
    goalRead: any,
    goal: apiGoalReadResponseGoalsType
}
export default function GoalItem (props: Props) {
    const [createGoalDialog, setCreateGoalDialog] = useState(false as boolean);
    return (
        <ListItem sx={{ p: 0 }}>
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar
                        sx={{
                            fontSize: "13px",
                            bgcolor: props.goal.sum_minute >= props.goal.minute ? "#1976d2" : ""
                        }}
                    >{Math.floor(props.goal.sum_minute * 100 / props.goal.minute)}%</Avatar>
                </ListItemAvatar>
                <ListItemText
                    onClick={() => { setCreateGoalDialog(true); }}
                    primary={props.goal.task_name}
                    secondary={<span>
                        目標:{props.goal.minute}分、実績:{props.goal.sum_minute}分<br />
                        {moment(props.goal.end_date).diff(moment(), "days") < 0 &&
                            "期限を過ぎています"
                        }
                        {
                            moment(props.goal.end_date).diff(moment(), "days") > 0 &&
                            props.goal.sum_minute < props.goal.minute &&
                            `残り${props.goal.deadline_day_count}日で${props.goal.minute - props.goal.sum_minute}分（${Math.floor((props.goal.minute - props.goal.sum_minute) / props.goal.deadline_day_count)}分/日）`
                        }
                    </span>}
                ></ListItemText>
            </ListItemButton>
            <Dialog open={createGoalDialog} onClose={() => { setCreateGoalDialog(false); }}>
                {createGoalDialog &&
                    <CreateGoal
                        onCloseMyself={() => {
                            setCreateGoalDialog(false);
                            props.goalRead();
                        }}
                        focusGoal={props.goal}
                    />
                }
            </Dialog>
        </ListItem>
    );
}
