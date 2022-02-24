import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { api } from '@/plugins/axios';
import { apiGoalReadResponseType } from '@/types/api/goal/read/response';
import { apiGoalReadResponseGoalsType } from '@/types/api/goal/read/response';
import { apiGoalCreateRequestType } from '@/types/api/goal/create/request';
import { apiGoalDeleteRequestType } from '@/types/api/goal/delete/request';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, CircularProgress } from '@mui/material';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import TextField from '@mui/material/TextField';
import { CardActionArea, IconButton, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { Dialog, Select, FormControl, MenuItem, InputLabel, Box } from '@mui/material';
import { MINUTE } from '@/static/const';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import moment from 'moment';
import { apiTaskReadRequestType } from '@/types/api/task/read/request';
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';

type Props = {
    focusGoal: apiGoalReadResponseGoalsType | null
    onCloseMyself: any
}
export default function Creategoal(props: Props) {
    const [goalCreateLoading, setGoalCreateLoading] = useState(false as boolean);
    const [goalDeleteLoading, setgoalDeleteLoading] = useState(false as boolean);
    const [tasks, setTasks] = useState([] as apiTaskReadResponseTaskType[]);
    const [id, setId] = useState(0 as number);
    const [minute, setMinute] = useState(0 as number);
    const [taskId, setTaskId] = useState(0 as number);
    const [startDate, setStartDate] = useState(moment().format('Y-M-D') as string);
    const [endDate, setEndDate] = useState(moment().format('Y-M-D') as string);

    const [nameError, setNameError] = useState("" as string);
    const goalDelete = () => {
        if (!confirm(`「${props.focusGoal.task_name}」を削除しますか？`)) {
            return;
        }
        const apiParam: apiGoalDeleteRequestType = {
            goal_id: id
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/goal/delete`,
            method: "DELETE",
            data: apiParam
        };
        setgoalDeleteLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiGoalReadResponseType>) => {
                props.onCloseMyself();
            })
            .finally(() => {
                setgoalDeleteLoading(false);
            });
    };
    const goalCreate = () => {
        if (validation()) {
            return;
        }
        const apiParam: apiGoalCreateRequestType = {
            id: id,
            minute: minute,
            task_id: taskId,
            start_date: startDate,
            end_date: endDate,
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/goal/create`,
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
        const isError: boolean = false;
        setNameError("");
        // if (name == "") {
        //     setNameError("目標の名前は必須です");
        //     isError = true;
        // }
        return isError;
    };

    const taskRead = () => {
        const params: apiTaskReadRequestType = {
            date: moment().format('YYYY-MM-DD'),
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/task/read`,
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
            setId(props.focusGoal.id);
            setMinute(props.focusGoal.minute);
            setTaskId(props.focusGoal.task_id);
            setStartDate(props.focusGoal.start_date);
            setEndDate(props.focusGoal.end_date);
        }
    }, []);
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className='card'>
                <div className="card_header">
                    <div className="card_header_left">
                        <h2 className="card_header_left_main">{props.focusGoal ? props.focusGoal.task_name : '新規目標登録'}</h2>
                    </div>
                </div>
                <div className="card_body">
                    <ul>
                        {Boolean(tasks.length) &&
                            <li className='mb-4'>
                                <FormControl fullWidth>
                                    <InputLabel id="task-id">タスク</InputLabel>
                                    <Select
                                        labelId="task-id"
                                        value={taskId}
                                        onChange={(e) => { setTaskId(Number(e.target.value)); }}
                                    >
                                        {tasks.map((task: apiTaskReadResponseTaskType, index: number) => (
                                            <MenuItem key={index.toString()} value={task.id}>{task.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </li>
                        }
                        <li className='mb-4'>
                            <FormControl fullWidth>
                                <InputLabel id="defaultーminute-label">目標時間</InputLabel>
                                <Select
                                    labelId="defaultーminute-label"
                                    value={minute}
                                    onChange={(e) => { setMinute(Number(e.target.value)); }}
                                >
                                    {MINUTE.map((minute: { txt: string; val: number; }, index: number) => (
                                        <MenuItem key={index.toString()} value={minute.val}>{minute.txt}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </li>
                        <li className='mb-4'>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Box sx={{ width: '45%', }}>
                                    <MobileDatePicker
                                        label="いつから"
                                        value={startDate}
                                        onChange={(v) => {
                                            setStartDate(moment(v).format('YYYY-MM-DD'));
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Box>
                                <Box sx={{
                                    width: '10%',
                                    textAlign: 'center'
                                }}>~</Box>
                                <Box sx={{ width: '45%', }}>
                                    <MobileDatePicker
                                        label="いつまで"
                                        value={endDate}
                                        onChange={(v) => {
                                            setEndDate(moment(v).format('YYYY-MM-DD'));
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Box>
                            </Box>
                        </li>
                    </ul>
                </div>
                <div className="card_footer justify-space-between">
                    <Button color="error"
                        onClick={goalDelete}
                        variant="contained"
                        endIcon={goalDeleteLoading ? <CircularProgress size={25} /> : <DeleteIcon />}
                        disabled={goalCreateLoading || goalDeleteLoading}
                    >削除</Button>
                    <Button
                        color="primary"
                        onClick={goalCreate}
                        variant="contained"
                        endIcon={goalCreateLoading ? <CircularProgress size={25} /> : <SendIcon />}
                        disabled={goalCreateLoading || goalDeleteLoading}
                    >登録</Button>
                </div>
            </div>
        </LocalizationProvider>
    );
}