import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { api } from '@/plugins/axios';
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';
import { apiWorkCreateRequestType } from '@/types/api/work/create/request';
import { apiWorkDeleteRequestType } from '@/types/api/work/delete/request';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, CircularProgress } from '@mui/material';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import TextField from '@mui/material/TextField';
import CreateTask from '@/components/task/CreateTask';
import { Dialog, Select, FormControl, MenuItem, InputLabel, Box } from '@mui/material';
import { TextareaAutosize, CardActionArea, IconButton, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';


type Props = {
    date: string,
    task: apiTaskReadResponseTaskType
    onCloseMyself: any
    taskRead: any
}
export default function CreateWork(props: Props) {
    const [workCreateLoading, setWorkCreateLoading] = useState(false as boolean);
    const [workDeleteLoading, setWorkDeleteLoading] = useState(false as boolean);
    const [createTaskDialog, setCreateTaskDialog] = useState(false as boolean);
    const [formMinute, setFormMinute] = useState(0);
    const [formHour, setFormHour] = useState(0);
    const [formMemo, setFormMemo] = useState('');
    const workDelete = () => {
        const apiParam: apiWorkDeleteRequestType = {
            date: props.date,
            task_id: props.task.id
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/work/delete`,
            method: "DELETE",
            data: apiParam
        };
        setWorkDeleteLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                props.taskRead();
                props.onCloseMyself();
            })
            .finally(() => {
                setWorkDeleteLoading(false);
            });
    };
    const workCreate = () => {
        const apiParam: apiWorkCreateRequestType = {
            id: props.task.work.id,
            date: props.date,
            task_id: props.task.id,
            minute: formHour * 60 + formMinute,
            memo: formMemo,
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/work/create`,
            method: "POST",
            data: apiParam
        };
        setWorkCreateLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                props.taskRead();
                props.onCloseMyself();
            })
            .finally(() => {
                setWorkCreateLoading(false);
            });
    };
    const onChangeMemo = (event) => {
        setFormMemo(event.target.value);
    };

    useEffect(() => {
        if (props.task.work.minute) {
            setFormHour(Math.floor(Number(props.task.work.minute) / 60));
            setFormMinute(Number(props.task.work.minute) % 60);
        } else {
            setFormHour(Math.floor(Number(props.task.default_minute) / 60));
            setFormMinute(props.task.default_minute % 60);
        }
        setFormMemo(props.task.work.memo);
    }, []);
    return (
        <div className='card'>
            <div className="card_header">
                <div className="card_header_left">
                    <h2 className="card_header_left_main">{props.task.name}</h2>
                    <h3 className='card_header_left_sub'>{props.date}</h3>
                </div>
                <div className="card_header_right">
                    <IconButton onClick={() => { setCreateTaskDialog(true); }} color="primary" className='card_header_right_btn' component="span">
                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>
            <div className="card_body">
                <ul>
                    <li className='mb-5'>
                        <h4>実績時間</h4>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '48%', }}>
                                <Select
                                    sx={{ width: '100%', }}
                                    value={formHour}
                                    onChange={(e) => { setFormHour(Number(e.target.value)); }}
                                >
                                    {[...Array(24 + 1)].map((n, index) => (
                                        <MenuItem key={index.toString()} value={index}>{index}時間</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <Box sx={{ width: '48%', }}>
                                <Select
                                    sx={{ width: '100%', }}
                                    value={formMinute}
                                    onChange={(e) => { setFormMinute(Number(e.target.value)); }}
                                >
                                    {[...Array(59 + 1)].map((n, index) => (
                                        <MenuItem key={index.toString()} value={index}>{index}分</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Box>
                    </li>
                    <li className='mb-5'>
                        <h4>メモ</h4>
                        <TextareaAutosize
                            onChange={onChangeMemo}
                            value={formMemo}
                            minRows={6}
                            placeholder="memo"
                            style={{ width: '100%' }}
                        />
                    </li>
                </ul>
            </div>
            <div className="card_footer justify-space-between">
                <LoadingButton
                    onClick={workDelete}
                    color="error"
                    variant="contained"
                    loading={workDeleteLoading}
                    disabled={workCreateLoading}
                >削除<DeleteIcon /></LoadingButton>
                <LoadingButton
                    onClick={workCreate}
                    color="primary"
                    variant="contained"
                    loading={workCreateLoading}
                    disabled={workDeleteLoading}
                >登録<SendIcon /></LoadingButton>
            </div>
            <Dialog open={createTaskDialog} onClose={() => { setCreateTaskDialog(false); }}>
                {createTaskDialog &&
                    <CreateTask
                        onCloseMyself={() => {
                            setCreateTaskDialog(false);
                            props.onCloseMyself();
                        }}
                        taskRead={props.taskRead}
                        task={props.task}
                    />
                }
            </Dialog>
        </div>
    );
}