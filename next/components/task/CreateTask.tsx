import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { api } from '@/plugins/axios';
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';
import { apiTaskCreateRequestType } from '@/types/api/task/create/request';
import { apiTaskDeleteRequestType } from '@/types/api/task/delete/request';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, CircularProgress } from '@material-ui/core';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import TextField from '@material-ui/core/TextField';
import CreateWork from '@/components/task/CreateWork';
import { CardActionArea, IconButton, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { Dialog, Select, FormControl, MenuItem, InputLabel, Box } from '@material-ui/core';
import { MINUTE } from '@/static/const';

type Props = {
    focusTask: apiTaskReadResponseTaskType
    onCloseMyself: any
    taskRead: any
}
export default function CreateTask(props: Props) {
    const [taskCreateLoading, setTaskCreateLoading] = useState(false as boolean);
    const [taskDeleteLoading, setTaskDeleteLoading] = useState(false as boolean);
    const [formTask, setFormTask] = useState({
        id: 0 as number,
        name: '' as string,
        default_minute: 3 as string | number,
        status: 1 as string | number,
        sort_key: null as number | null,
    });
    const [nameError, setNameError] = useState("" as string);
    const taskDelete = () => {
        if (!confirm(`「${props.focusTask.name}」を削除しますか？`)) {
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
                props.taskRead();
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
            task_default_minute: Number(formTask.default_minute),
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/task/create`,
            method: "POST",
            data: apiParam
        };
        setTaskCreateLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                props.taskRead();
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
        if (props.focusTask) {
            setFormTask({
                id: props.focusTask.id,
                name: props.focusTask.name,
                default_minute: props.focusTask.default_minute,
                status: props.focusTask.status,
                sort_key: props.focusTask.sort_key,
            });
        }
    }, []);
    return (
        <div className='card'>
            {formTask && <>
                <div className="card_header">
                    <div className="card_header_left">
                        <h2 className="card_header_left_main">{props.focusTask ? props.focusTask.name : '新規タスク登録'}</h2>
                    </div>
                </div>
                <div className="card_body">
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
                            <FormControl fullWidth>
                                <InputLabel id="defaultーminute-label">想定時間</InputLabel>
                                <Select
                                    labelId="defaultーminute-label"
                                    value={formTask.default_minute}
                                    onChange={(e) => { setFormTask({ ...formTask, default_minute: Number(e.target.value) }); }}
                                >
                                    {MINUTE.map((minute: { txt: string; val: number; }, index: number) => (
                                        <MenuItem key={index.toString()} value={minute.val}>{minute.txt}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </li>
                        <li className='mb-3'>
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
                        </li>
                    </ul>
                </div>
                <div className="card_footer justify-space-between">
                    <Button color="secondary"
                        onClick={taskDelete}
                        variant="contained"
                        endIcon={taskDeleteLoading ? <CircularProgress size={25} /> : <DeleteIcon />}
                        disabled={taskCreateLoading || taskDeleteLoading}
                    >削除</Button>
                    <Button color="primary"
                        onClick={taskCreate}
                        variant="contained"
                        endIcon={taskCreateLoading ? <CircularProgress size={25} /> : <SendIcon />}
                        disabled={taskCreateLoading || taskDeleteLoading}
                    >登録</Button>
                </div>
            </>}
        </div>
    );
}