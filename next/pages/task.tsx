import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { CardActionArea, IconButton, Dialog, ListItem, ListItemAvatar, ListItemText, Avatar, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { api } from '../plugins/axios';
import { apiTaskReadResponseType } from '../types/api/task/read/response'
import { apiTaskReadResponseTaskType } from '../types/api/task/read/response'
import CreateTask from '../components/task/CreateTask'
import Layout from '../layouts/default'
Task.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}
export default function Task() {
    const [createTaskDialog, setCreateTaskDialog] = useState(false as boolean)
    const [focusTask, setFocusTask] = useState(null as apiTaskReadResponseTaskType | null)
    const [tasks, setTasks] = useState([] as apiTaskReadResponseTaskType[])
    const [taskReadLoading, seTtaskReadLoading] = useState(false as boolean)

    const onFocusTask = (e: React.MouseEvent<HTMLElement>) => {
        var clickedIndex = e.currentTarget.dataset.index
        setFocusTask(tasks[clickedIndex])
        setCreateTaskDialog(true)
    }

    const onNewTask = () => {
        setFocusTask(null)
        setCreateTaskDialog(true)
    }

    const taskRead = () => {
        const today = new Date();
        const params = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
        }
        const requestConfig: AxiosRequestConfig = {
            url: `/api/task/read`,
            method: "GET",
            params: params
        };
        seTtaskReadLoading(true)
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                setTasks(res.data.tasks)
                console.log(res)
            })
            .catch((err: AxiosError) => {
            })
            .finally(() => {
                seTtaskReadLoading(false)
            })
    }
    useEffect(() => {
        taskRead()
    }, [])

    return (
        <>
            <div className="card">
                <div className="card_header">
                    <span className="card_header_ttl">タイトル</span>
                    <IconButton onClick={onNewTask} color="primary" className='card_header_btn' component="span">
                        <AddIcon />
                    </IconButton>
                </div>
                {taskReadLoading && !Boolean(tasks.length) &&
                    <div className='d-flex justify-center pa-5 ma-5'>
                        <CircularProgress />
                    </div>
                }
                {Boolean(tasks.length) &&
                    <div>
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
            </div>

            <Dialog open={createTaskDialog} onClose={() => { setCreateTaskDialog(false) }}>
                {createTaskDialog &&
                    <CreateTask onCloseMyself={() => { setCreateTaskDialog(false) }} taskRead={taskRead} focusTask={focusTask} />
                }
            </Dialog>
            {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
        </>
    )
}