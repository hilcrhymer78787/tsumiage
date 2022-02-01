import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Button from '@material-ui/core/Button';
import { api } from '../plugins/axios';
import TextField from '@material-ui/core/TextField';
import { apiTaskReadResponseType } from '../types/api/task/read/response'
import { apiTaskReadResponseTaskType } from '../types/api/task/read/response'
import { apiTaskCreateRequestType } from '../types/api/task/create/request'
import { apiTaskCreateRequestTaskType } from '../types/api/task/create/request'

function Task() {
    const [keyword, setKeyword] = useState("東京" as string)
    const [tasks, setTasks] = useState([] as apiTaskReadResponseTaskType[])
    const keywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }
    const taskRead = () => {
        const today = new Date();
        const params = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate() - 3
        }
        const requestConfig: AxiosRequestConfig = {
            url: `/api/task/read`,
            method: "GET",
            params: params
        };
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                setTasks(res.data.tasks)
            })
            .catch((err: AxiosError) => {
            })
    }
    const taskCreate = () => {
        const apiParam: apiTaskCreateRequestType = {
            task: {
                task_id: 0,
                task_status: 1,
                task_name: 'hoge',
                task_point_per_minute: 1,
                task_default_minute: 3,
                task_user_id: 1,
            }
        }
        const requestConfig: AxiosRequestConfig = {
            url: `/api/task/create`,
            method: "POST",
            data: apiParam
        };
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                taskRead()
            })
            .catch((err: AxiosError) => {
            })
    }
    useEffect(() => {
        taskRead()
    }, [])

    return (
        <>
            <TextField value={keyword} onChange={keywordChange} id="outlined-basic" variant="outlined" color="primary" />
            <Button onClick={taskCreate} variant="contained" color="primary">追加</Button>
            {
                tasks &&
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index.toString()}>
                            <strong>{task.id}</strong>
                            <span>{task.name}</span>
                            <hr />
                        </li>
                    ))}
                </ul>
            }
            {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
        </>
    )
}
export default Task;