import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React, { useState, useEffect } from "react";
import { api } from "@/plugins/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { MINUTE } from "@/static/const";
import { connect } from "react-redux";
import moment from "moment";
import LinePlot from "@/components/common/LinePlot";
import { apiGoalReadResponseType } from "@/types/api/goal/read/response";
import { apiGoalReadResponseGoalsType } from "@/types/api/goal/read/response";
import { apiGoalCreateRequestType } from "@/types/api/goal/create/request";
import { apiGoalDeleteRequestType } from "@/types/api/goal/delete/request";
import { apiTaskReadRequestType } from "@/types/api/task/read/request";
import { apiTaskReadResponseType } from "@/types/api/task/read/response";
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
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { LoadingButton } from "@mui/lab";
const mapStateToProps = (state: any, ownProps:Props) => {
    return {
        loginInfo: state.loginInfo,
        props:ownProps
    };
};
type Props = {
    focusGoal: apiGoalReadResponseGoalsType | null
    onCloseMyself: any
}
function Creategoal ({ loginInfo,props }: any) {
    const [goalCreateLoading, setGoalCreateLoading] = useState(false as boolean);
    const [goalDeleteLoading, setGoalDeleteLoading] = useState(false as boolean);
    const [tasks, setTasks] = useState([] as apiTaskReadResponseTaskType[]);
    const [id, setId] = useState(0 as number);
    const [hour, setHour] = useState("" as number | string);
    const [minute, setMinute] = useState(0 as number);
    const [taskId, setTaskId] = useState(0 as number);
    const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD") as string);
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD") as string);

    const [hourError, setHourError] = useState("" as string);
    const [dateError, setDateError] = useState("" as string);
    const goalDelete = () => {
        if (!confirm(`「${props.focusGoal.task_name}」を削除しますか？`)) {
            return;
        }
        const apiParam: apiGoalDeleteRequestType = {
            goal_id: id
        };
        const requestConfig: AxiosRequestConfig = {
            url: "/api/goal/delete",
            method: "DELETE",
            data: apiParam
        };
        setGoalDeleteLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse) => {
                props.onCloseMyself();
            })
            .finally(() => {
                setGoalDeleteLoading(false);
            });
    };
    const goalCreate = () => {
        if (validation()) {
            return;
        }
        const apiParam: apiGoalCreateRequestType = {
            id: id,
            minute: Number(hour) * 60 + minute,
            task_id: taskId,
            start_date: startDate,
            end_date: endDate,
        };
        const requestConfig: AxiosRequestConfig = {
            url: "/api/goal/create",
            method: "POST",
            data: apiParam
        };
        setGoalCreateLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiGoalReadResponseType>) => {
                props.onCloseMyself();
            })
            .finally(() => {
                setGoalCreateLoading(false);
            });
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

    const taskRead = () => {
        const params: apiTaskReadRequestType = {
            date: moment().format("YYYY-MM-DD"),
            user_id: loginInfo.id
        };
        const requestConfig: AxiosRequestConfig = {
            url: "/api/task/read",
            method: "GET",
            params: params
        };
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                setTasks(res.data.tasks);
                if (!props.focusGoal) {
                    setTaskId(res.data.tasks[0].id);
                }
            });
    };

    useEffect(() => {
        taskRead();
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                                            onChange={(v) => {
                                                setStartDate(moment(v).format("YYYY-MM-DD"));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Box>
                                    <Box sx={{
                                        width: "16%",
                                        textAlign: "center"
                                    }}>~</Box>
                                    <Box sx={{ width: "42%", }}>
                                        <MobileDatePicker
                                            value={endDate}
                                            onChange={(v) => {
                                                setEndDate(moment(v).format("YYYY-MM-DD"));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
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
                        onClick={goalDelete}
                        loading={goalDeleteLoading}
                        disabled={goalCreateLoading}>
                        削除<DeleteIcon />
                    </LoadingButton>
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        onClick={goalCreate}
                        loading={goalCreateLoading}
                        disabled={goalDeleteLoading}>
                        登録<SendIcon />
                    </LoadingButton>
                </CardActions>
            </Card>
        </LocalizationProvider>
    );
}
export default connect(mapStateToProps)(Creategoal);