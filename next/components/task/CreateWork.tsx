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
import { Button, CircularProgress } from '@material-ui/core';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import TextField from '@material-ui/core/TextField';
import CreateTask from '@/components/task/CreateTask';
import { Dialog, Select, FormControl, MenuItem, InputLabel, Box } from '@material-ui/core';
import { TextareaAutosize, CardActionArea, IconButton, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { MINUTE } from '@/static/const';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';

type Props = {
    date: string,
    focusTask: apiTaskReadResponseTaskType
    onCloseMyself: any
    openCreateTaskDialog: any
    taskRead: any
}
export default function CreateWork(props: Props) {
    const [workCreateLoading, setWorkCreateLoading] = useState(false as boolean);
    const [workDeleteLoading, setWorkDeleteLoading] = useState(false as boolean);
    const [formMinute, setFormMinute] = useState(0);
    const [formMemo, setFormMemo] = useState('');
    const workDelete = () => {
        const apiParam: apiWorkDeleteRequestType = {
            date: props.date,
            task_id: props.focusTask.id
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
            id: props.focusTask.work.id,
            date: props.date,
            task_id: props.focusTask.id,
            minute: formMinute,
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

    const onChangeMinute = (event) => {
        setFormMinute(Number(event.target.value));
    };

    const onChangeMemo = (event) => {
        setFormMemo(event.target.value);
    };

    useEffect(() => {
        if (props.focusTask.work.minute) {
            setFormMinute(props.focusTask.work.minute);
        } else {
            setFormMinute(props.focusTask.default_minute);
        }
        setFormMemo(props.focusTask.work.memo);
    }, []);
    return (
        <div className='card'>
            <div className="card_header">
                <div className="card_header_left">
                    <h2 className="card_header_left_main">{props.focusTask.name}</h2>
                    <h3 className='card_header_left_sub'>{props.date}</h3>
                </div>
                <div className="card_header_right">
                    <IconButton onClick={() => { props.openCreateTaskDialog(); }} color="primary" className='card_header_right_btn' component="span">
                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>
            <div className="card_body">
                <ul>
                    <li className='mb-5'>
                        <FormControl fullWidth>
                            <InputLabel id="minute-label">実績時間</InputLabel>
                            <Select
                                labelId="minute-label"
                                value={formMinute}
                                onChange={onChangeMinute}
                            >
                                {MINUTE.map((minute: { txt: string; val: number; }, index: number) => (
                                    <MenuItem key={index.toString()} value={minute.val}>{minute.txt}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                <Button color="secondary"
                    onClick={workDelete}
                    variant="contained"
                    endIcon={workDeleteLoading ? <CircularProgress size={25} /> : <DeleteIcon />}
                    disabled={workCreateLoading || workDeleteLoading}
                >削除</Button>
                <Button color="primary"
                    onClick={workCreate}
                    variant="contained"
                    endIcon={workCreateLoading ? <CircularProgress size={25} /> : <SendIcon />}
                    disabled={workCreateLoading || workDeleteLoading}
                >登録</Button>
            </div>
        </div>
    );
}