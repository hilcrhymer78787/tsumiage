import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { api } from '@/plugins/axios';
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';
import { apiWorkCreateRequestType } from '@/types/api/work/create/request';
import { apiWorkDeleteRequestType } from '@/types/api/work/delete/request'
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, CircularProgress } from '@material-ui/core';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import TextField from '@material-ui/core/TextField';
type Props = {
    date: string,
    focusTask: apiTaskReadResponseTaskType
    onCloseMyself: any
    taskRead: any
}
export default function CreateWork(props: Props) {
    const [workCreateLoading, setWorkCreateLoading] = useState(false as boolean);
    const [workDeleteLoading, setWorkDeleteLoading] = useState(false as boolean);
    const [formMinute, setFormMinute] = useState(0);
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
                props.taskRead()
                props.onCloseMyself()
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
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/work/create`,
            method: "POST",
            data: apiParam
        };
        setWorkCreateLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                props.taskRead()
                props.onCloseMyself()
            })
            .finally(() => {
                setWorkCreateLoading(false);
            });
    };
    useEffect(() => {
        setFormMinute(props.focusTask.work.minute)
    }, []);
    return (
        <div className='card'>
            <div className="card_header">
                <span className="card_header_ttl">クリエイトワーク</span>
                <SettingsIcon onClick={() => { alert(); }} />
            </div>
            <div className="card_body">
                <ul>
                    <li className='mb-3'>
                        <TextField
                            value={formMinute}
                            onChange={(e) => { setFormMinute(Number(e.currentTarget.value)) }}
                            label="実績時間" variant="outlined" color="primary" />
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