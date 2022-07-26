import React, { useState, useEffect } from "react";
import { MINUTE } from "@/static/const";
import { connect } from "react-redux";
import moment from "moment";
import LinePlot from "@/components/common/LinePlot";
import { apiGoalReadResponseGoalsType } from "@/types/api/goal/read/response";
import { apiTaskReadResponseTaskType } from "@/types/api/task/read/response";
import {
  Select,
  MenuItem,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LoadingButton } from "@mui/lab";
import { useTaskApi } from "@/data/task";
import { useGoalApi } from "@/data/goal";
import axios from "axios";
const mapStateToProps = (state: any, ownProps: Props) => {
  return {
    loginInfo: state.loginInfo,
    props: ownProps
  };
};
type Props = {
  focusGoal: apiGoalReadResponseGoalsType | null
  onCloseMyself: () => void
}
const Creategoal = ({ loginInfo, props }: any) => {
  const { taskRead } = useTaskApi();
  const { goalCreate, goalCreateLoading, goalDelete, goalDeleteLoading } = useGoalApi();
  const [tasks, setTasks] = useState<apiTaskReadResponseTaskType[]>([]);
  const [id, setId] = useState<number>(0);
  const [hour, setHour] = useState<number | string>("");
  const [minute, setMinute] = useState<number>(0);
  const [taskId, setTaskId] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState<string>(moment().format("YYYY-MM-DD"));
  const [hourError, setHourError] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");
  const apiGoalDelete = async () => {
    if (!confirm(`「${props.focusGoal.task_name}」を削除しますか？`)) return;
    try {
      await goalDelete({
        goal_id: id
      });
      props.onCloseMyself();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラーが発生しました");
      }
    }
  };
  const apiGoalCreate = async () => {
    if (validation()) return;
    try {
      await goalCreate({
        id: id,
        minute: Number(hour) * 60 + minute,
        task_id: taskId,
        start_date: startDate,
        end_date: endDate,
      });
      props.onCloseMyself();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラーが発生しました");
      }
    }
  };
  const validation = (): boolean => {
    let isError: boolean = false;
    setHourError("");
    setDateError("");
    if (!(/^[0-9]*$/.test(hour.toString()))) {
      setHourError("半角数値で入力してください");
      isError = true;
    }
    if (Number(hour) * 60 + minute == 0) {
      setHourError("目標合計時間が設定されていません");
      isError = true;
    }
    if (moment(endDate).diff(moment(startDate), "days") < 0) {
      setDateError("開始日以降の期限日を設定してください");
      isError = true;
    }
    if (moment(endDate).diff(moment(startDate), "days") > 366) {
      setDateError("366日以上の範囲は設定できません");
      isError = true;
    }
    return isError;
  };

  const apiTaskRead = async () => {
    try {
      const res = await taskRead({
        date: moment().format("YYYY-MM-DD"),
        user_id: loginInfo.id
      });
      setTasks(res.data.tasks);
      if (!props.focusGoal) {
        setTaskId(res.data.tasks[0].id);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラーが発生しました");
      }
    }
  };

  useEffect(() => {
    apiTaskRead();
    if (props.focusGoal) {
      if (Math.floor(props.focusGoal.minute / 60)) {
        setHour(Math.floor(props.focusGoal.minute / 60));
      }
      setId(props.focusGoal.id);
      setMinute(props.focusGoal.minute % 60);
      setTaskId(props.focusGoal.task_id);
      setStartDate(props.focusGoal.start_date);
      setEndDate(props.focusGoal.end_date);
    }
  }, []);
  return (
    <Card>
      <CardHeader title={props.focusGoal ? props.focusGoal.task_name : "新規目標登録"} />
      <CardContent>
        <ul>
          {Boolean(props.focusGoal) && <>
            <li>
              <Box sx={{ mb: "16px" }}>
                <LinePlot height="200px" data={props.focusGoal.analytics} />
              </Box>
            </li>
          </>}
          {Boolean(tasks.length) &&
            <li>
              <Box sx={{ mb: "16px" }}>
                <h4>タスク</h4>
                <Select
                  sx={{ width: "100%", }}
                  labelId="task-id"
                  value={taskId}
                  onChange={(e) => { setTaskId(Number(e.target.value)); }}
                >
                  {tasks.map((task: apiTaskReadResponseTaskType, index: number) => (
                    <MenuItem key={index.toString()} value={task.id}>{task.name}</MenuItem>
                  ))}
                </Select>
              </Box>
            </li>
          }
          <li>
            <Box sx={{ mb: "16px" }}>
              <h4>目標合計時間</h4>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ width: "42%", }}>
                  <TextField
                    error={Boolean(hourError)}
                    value={hour}
                    onChange={(e) => { setHour(e.currentTarget.value); }}
                    variant="outlined" color="primary"
                  />
                </Box>
                <Box sx={{ width: "16%", p: "20px 0 0 1%" }}>時間</Box>
                <Box sx={{ width: "42%", }}>
                  <Select
                    error={Boolean(hourError)}
                    sx={{ width: "100%", }}
                    value={minute}
                    onChange={(e) => { setMinute(Number(e.target.value)); }}
                  >
                    {MINUTE.map((minute: { txt: string; val: number; }, index: number) => (
                      <MenuItem key={index.toString()} value={minute.val}>{minute.txt}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>
            </Box>
            {Boolean(hourError) &&
              <Typography sx={{ color: "#d32f2f", fontSize: "13px" }}>{hourError}</Typography>
            }
          </li>
          <li>
            <Box sx={{ mb: "16px" }}>
              <h4>目標期間</h4>
              <Box sx={{
                display: "flex",
                alignItems: "center"
              }}>
                <Box sx={{ width: "42%", }}>
                  <MobileDatePicker
                    value={startDate}
                    onChange={(v: any) => {
                      setStartDate(moment(v).format("YYYY-MM-DD"));
                    }}
                    renderInput={(params: any) => <TextField {...params} />}
                    inputFormat="yyyy/MM/dd"
                  />
                </Box>
                <Box sx={{
                  width: "16%",
                  textAlign: "center"
                }}>~</Box>
                <Box sx={{ width: "42%", }}>
                  <MobileDatePicker
                    value={endDate}
                    onChange={(v: any) => {
                      setEndDate(moment(v).format("YYYY-MM-DD"));
                    }}
                    renderInput={(params: any) => <TextField {...params} />}
                    inputFormat="yyyy/MM/dd"
                  />
                </Box>
              </Box>
              {Boolean(dateError) &&
                <Typography sx={{ color: "#d32f2f", fontSize: "13px" }}>{dateError}</Typography>
              }
            </Box>
          </li>
        </ul>
      </CardContent>
      <CardActions>
        <LoadingButton
          color="error"
          variant="contained"
          onClick={apiGoalDelete}
          loading={goalDeleteLoading}
          disabled={goalCreateLoading}>
          削除<DeleteIcon />
        </LoadingButton>
        <LoadingButton
          color="primary"
          variant="contained"
          onClick={apiGoalCreate}
          loading={goalCreateLoading}
          disabled={goalDeleteLoading}>
          登録<SendIcon />
        </LoadingButton>
      </CardActions>
    </Card>
  );
};
export default connect(mapStateToProps)(Creategoal);