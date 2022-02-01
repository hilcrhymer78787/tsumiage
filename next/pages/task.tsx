import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Card, CardHeader, CardActionArea, IconButton, Dialog } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { api } from '../plugins/axios';
import TextField from '@material-ui/core/TextField';
import { apiTaskReadResponseType } from '../types/api/task/read/response'
import { apiTaskReadResponseTaskType } from '../types/api/task/read/response'
import { apiTaskCreateRequestType } from '../types/api/task/create/request'
import { apiTaskCreateRequestTaskType } from '../types/api/task/create/request'
import CreateTask from '../components/task/CreateTask'

function Task() {
    const [keyword, setKeyword] = useState("東京" as string)
    const [createTaskDialog, setCreateTaskDialog] = useState(false as boolean)
    const [focusTask, setFocusTask] = useState(null as apiTaskReadResponseTaskType | null)
    const [tasks, setTasks] = useState([] as apiTaskReadResponseTaskType[])
    const keywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    const onFocusTask = (e: React.MouseEvent<HTMLElement>) => {
        var clickedIndex = e.currentTarget.dataset.index
        setFocusTask(tasks[clickedIndex])
        setCreateTaskDialog(true)
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
            <Button onClick={taskCreate} variant="contained" color="primary" className="ms-2">追加</Button>
            {
                tasks &&
                <div className="card mt-3">
                    <div className="card_header">
                        <span className="card_header_ttl">タイトル</span>
                        <IconButton color="primary" className='card_header_btn' component="span">
                            <AddIcon />
                        </IconButton>
                    </div>
                    {tasks.map((task, index) => (
                        <CardActionArea onClick={onFocusTask} data-index={index} key={index.toString()}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src="https://i.picsum.photos/id/30/500/300.jpg?hmac=p1-iOhnRmBgus54WChFXINxaQuqvFO-q0wegbZjjLo0" />
                                </ListItemAvatar>
                                <ListItemText>{task.name}</ListItemText>
                            </ListItem>
                        </CardActionArea>
                    ))}
                </div>
            }

            <Dialog open={createTaskDialog} onClose={() => { setCreateTaskDialog(false) }}>
                {focusTask &&
                    <CreateTask onCloseMyself={() => { setCreateTaskDialog(false) }} focusTask={focusTask} />
                }
            </Dialog>
            {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
        </>
    )
}
export default Task;