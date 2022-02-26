import React, { useState, useEffect } from 'react';
import { api } from '@/plugins/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';
import { apiTaskCreateRequestType } from '@/types/api/task/create/request';
import { apiTaskDeleteRequestType } from '@/types/api/task/delete/request';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    TextField,
    Select,
    MenuItem,
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActionArea,
    CardActions,
    IconButton,
    Dialog,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    CircularProgress
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

type Props = {
    task: apiTaskReadResponseTaskType
    onCloseMyself: any
}
export default function CreateTask(props: Props) {
    const [taskCreateLoading, setTaskCreateLoading] = useState(false as boolean);
    const [taskDeleteLoading, setTaskDeleteLoading] = useState(false as boolean);
    const [formTask, setFormTask] = useState({
        id: 0 as number,
        name: '' as string,
        default_hour: 0 as number,
        default_minute: 0 as number,
        status: 1 as string | number,
        sort_key: null as number | null,
    });
    const [nameError, setNameError] = useState("" as string);
    const taskDelete = () => {
        if (!confirm(`「${props.task.name}」を削除しますか？`)) {
            return;
        }
        const apiParam: apiTaskDeleteRequestType = {
            task_id: formTask.id
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/task/delete`,
            method: "DELETE",
            data: apiParam
        };
        setTaskDeleteLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                props.onCloseMyself();
            })
            .finally(() => {
                setTaskDeleteLoading(false);
            });
    };
    const taskCreate = () => {
        if (validation()) {
            return;
        }
        const apiParam: apiTaskCreateRequestType = {
            task_id: formTask.id,
            task_name: formTask.name,
            task_status: Number(formTask.status),
            task_default_minute: formTask.default_hour * 60 + formTask.default_minute
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/task/create`,
            method: "POST",
            data: apiParam
        };
        setTaskCreateLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                props.onCloseMyself();
            })
            .finally(() => {
                setTaskCreateLoading(false);
            });
    };
    const validation = (): boolean => {
        let isError: boolean = false;
        setNameError("");
        if (formTask.name == "") {
            setNameError("タスクの名前は必須です");
            isError = true;
        }
        return isError;
    };
    useEffect(() => {
        if (props.task) {
            setFormTask({
                id: props.task.id,
                name: props.task.name,
                default_hour: Math.floor(props.task.default_minute / 60),
                default_minute: props.task.default_minute % 60,
                status: props.task.status,
                sort_key: props.task.sort_key,
            });
        }
    }, []);
    return (
        <Card>
            <CardHeader title={props.task ? props.task.name : '新規タスク登録'}/>
            <CardContent>
                <ul>
                    <li className='mb-3'>
                        <TextField
                            error={Boolean(nameError)}
                            helperText={nameError}
                            value={formTask.name}
                            onChange={(e) => { setFormTask({ ...formTask, name: e.currentTarget.value }); }}
                            label="タスクの名前" variant="outlined" color="primary" />
                    </li>
                    <li className='mb-3'>
                        <h4>1日あたりの想定時間</h4>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '48%', }}>
                                <Select
                                    sx={{ width: '100%', }}
                                    value={formTask.default_hour}
                                    onChange={(e) => { setFormTask({ ...formTask, default_hour: Number(e.target.value) }); }}
                                >
                                    {[...Array(24 + 1)].map((n, index) => (
                                        <MenuItem key={index.toString()} value={index}>{index}時間</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <Box sx={{ width: '48%', }}>
                                <Select
                                    sx={{ width: '100%', }}
                                    value={formTask.default_minute}
                                    onChange={(e) => { setFormTask({ ...formTask, default_minute: Number(e.target.value) }); }}
                                >
                                    {[...Array(59 + 1)].map((n, index) => (
                                        <MenuItem key={index.toString()} value={index}>{index}分</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Box>
                    </li>
                    {/* <li className='mb-3'>
                            <FormControl fullWidth>
                                <InputLabel id="defaultーminute-label">ステータス</InputLabel>
                                <Select
                                    labelId="defaultーminute-label"
                                    value={formTask.status}
                                    onChange={(e) => { setFormTask({ ...formTask, status: Number(e.target.value) }); }}
                                >
                                    {[...Array(10 + 1)].map((n, index) => (
                                        <MenuItem key={index.toString()} value={index}>{index}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </li> */}
                </ul>
            </CardContent>
            <CardActions>
                <LoadingButton
                    color="error"
                    variant="contained"
                    onClick={taskDelete}
                    loading={taskDeleteLoading}
                    disabled={taskCreateLoading}>
                    削除<DeleteIcon />
                </LoadingButton>
                <LoadingButton
                    color="primary"
                    variant="contained"
                    onClick={taskCreate}
                    loading={taskCreateLoading}
                    disabled={taskDeleteLoading}>
                    登録<SendIcon />
                </LoadingButton>
            </CardActions>
        </Card>
    );
}