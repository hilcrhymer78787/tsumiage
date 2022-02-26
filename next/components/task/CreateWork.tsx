import React, { useState, useEffect } from 'react';
import { api } from '@/plugins/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';
import { apiWorkCreateRequestType } from '@/types/api/work/create/request';
import { apiWorkDeleteRequestType } from '@/types/api/work/delete/request';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import CreateTask from '@/components/task/CreateTask';
import { LoadingButton } from '@mui/lab';
import {
    TextareaAutosize,
    Select,
    MenuItem,
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    IconButton,
    Dialog,
} from '@mui/material';

type Props = {
    date: string,
    task: apiTaskReadResponseTaskType
    onCloseMyself: any
}
export default function CreateWork(props: Props) {
    const [workCreateLoading, setWorkCreateLoading] = useState(false as boolean);
    const [workDeleteLoading, setWorkDeleteLoading] = useState(false as boolean);
    const [createTaskDialog, setCreateTaskDialog] = useState(false as boolean);
    const [formMinute, setFormMinute] = useState(0);
    const [formHour, setFormHour] = useState(0);
    const [formMemo, setFormMemo] = useState('');
    const workDelete = () => {
        if (!confirm(`「${props.task.name}」の実績を削除しますか？`)) {
            return;
        }
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
        <Card>
            <CardHeader
                action={
                    <IconButton onClick={() => { setCreateTaskDialog(true); }} color="primary">
                        <SettingsIcon />
                    </IconButton>
                }
                title={props.task.name}
                subheader={props.date}
            />
            <CardContent>
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
            </CardContent>
            <CardActions>
                <LoadingButton
                    onClick={workDelete}
                    color="error"
                    variant="contained"
                    loading={workDeleteLoading}
                    disabled={workCreateLoading}>
                    削除<DeleteIcon />
                </LoadingButton>
                <LoadingButton
                    onClick={workCreate}
                    color="primary"
                    variant="contained"
                    loading={workCreateLoading}
                    disabled={workDeleteLoading}>
                    登録<SendIcon />
                </LoadingButton>
            </CardActions>
            <Dialog open={createTaskDialog} onClose={() => { setCreateTaskDialog(false); }}>
                {createTaskDialog &&
                    <CreateTask
                        onCloseMyself={() => {
                            setCreateTaskDialog(false);
                            props.onCloseMyself();
                        }}
                        task={props.task}
                    />
                }
            </Dialog>
        </Card>
    );
}