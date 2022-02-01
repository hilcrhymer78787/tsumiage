import React, { useState, useEffect } from 'react';
import { api } from '../../plugins/axios';
import { apiTaskReadResponseType } from '../../types/api/task/read/response'
import { apiTaskReadResponseTaskType } from '../../types/api/task/read/response'
import { apiTaskCreateRequestType } from '../../types/api/task/create/request'
import SendIcon from '@material-ui/icons/Send';
import { Button, CircularProgress } from '@material-ui/core';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import TextField from '@material-ui/core/TextField';
type Props = {
    focusTask: apiTaskReadResponseTaskType
    onCloseMyself: any
    taskRead: any
}
export default function CreateTask(props: Props) {
    const [taskCreateLoading, setTaskCreateLoading] = useState(false as boolean)
    const [formTask, setFormTask] = useState({
        id: 0 as number,
        name: '' as string,
        default_minute: 3 as string | number,
        point_per_minute: 3 as string | number,
        status: 1 as string | number,
        sort_key: null as number | null,
    })
    const taskCreate = () => {
        const apiParam: apiTaskCreateRequestType = {
            task_id: formTask.id,
            task_name: formTask.name,
            task_point_per_minute: Number(formTask.point_per_minute),
            task_status: Number(formTask.status),
            task_default_minute: Number(formTask.default_minute),
        }
        const requestConfig: AxiosRequestConfig = {
            url: `/api/task/create`,
            method: "POST",
            data: apiParam
        };
        setTaskCreateLoading(true)
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                props.taskRead()
                props.onCloseMyself()
            })
            .catch((err: AxiosError) => {
            })
            .finally(() => {
                setTaskCreateLoading(false)
            })
    }
    const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.currentTarget.id) {
            case 'name':
                setFormTask({ ...formTask, name: e.currentTarget.value });
                break;
            case 'point_per_minute':
                setFormTask({ ...formTask, point_per_minute: e.currentTarget.value });
                break;
            case 'default_minute':
                setFormTask({ ...formTask, default_minute: e.currentTarget.value });
                break;
            case 'status':
                setFormTask({ ...formTask, status: e.currentTarget.value });
                break;
        }
    }
    useEffect(() => {
        if (props.focusTask) {
            setFormTask({
                id: props.focusTask.id,
                name: props.focusTask.name,
                default_minute: props.focusTask.default_minute,
                point_per_minute: props.focusTask.point_per_minute,
                status: props.focusTask.status,
                sort_key: props.focusTask.sort_key,
            })
        }
    }, [])
    return (
        <div className='card'>
            {formTask && <>
                <div className="card_header">
                    <span className="card_header_ttl">{props.focusTask ? props.focusTask.name : '新規タスク登録'}</span>
                </div>
                <div className="card_body">
                    <ul>
                        <li className='mb-3'>
                            <TextField value={formTask.name} onChange={onChangeForm} label="name" id="name" variant="outlined" color="primary" />
                        </li>
                        <li className='mb-3'>
                            <TextField value={formTask.point_per_minute} onChange={onChangeForm} label="point_per_minute" id="point_per_minute" variant="outlined" color="primary" />
                        </li>
                        <li className='mb-3'>
                            <TextField value={formTask.default_minute} onChange={onChangeForm} label="default_minute" id="default_minute" variant="outlined" color="primary" />
                        </li>
                        <li className='mb-3'>
                            <TextField value={formTask.status} onChange={onChangeForm} label="status" id="status" variant="outlined" color="primary" />
                        </li>
                    </ul>
                </div>
                <div className="card_footer">
                    <Button color="primary"
                        onClick={taskCreate}
                        variant="contained"
                        endIcon={taskCreateLoading ? <CircularProgress size={25} /> : <SendIcon />}
                        disabled={taskCreateLoading}
                    >登録</Button>
                </div>
            </>}
        </div>
    )
}