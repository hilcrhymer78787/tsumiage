import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { CardActionArea, IconButton, Dialog, ListItem, ListItemAvatar, ListItemText, Avatar, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { api } from '@/plugins/axios';
import { apiTaskReadRequestType } from '@/types/api/task/read/request';
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';
import CreateWork from '@/components/task/CreateWork';
import CreateTask from '@/components/task/CreateTask';
import moment from 'moment';
type Props = {
    date: string,
}
export default function TaskList(props: Props) {
    const [createWorkDialog, setCreateWorkDialog] = useState(false as boolean);
    const [createTaskDialog, setCreateTaskDialog] = useState(false as boolean);
    const [focusTask, setFocusTask] = useState(null as apiTaskReadResponseTaskType | null);
    const [tasks, setTasks] = useState([] as apiTaskReadResponseTaskType[]);
    const [taskReadLoading, seTtaskReadLoading] = useState(false as boolean);

    const onFocusTask = (e: React.MouseEvent<HTMLElement>) => {
        const clickedIndex = e.currentTarget.dataset.index;
        setFocusTask(tasks[clickedIndex]);
        setCreateWorkDialog(true);
    };

    const onNewTask = () => {
        setFocusTask(null);
        setCreateTaskDialog(true);
    };

    const taskRead = () => {
        const params: apiTaskReadRequestType = {
            date: props.date,
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/task/read`,
            method: "GET",
            params: params
        };
        seTtaskReadLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                setTasks(res.data.tasks);
            })
            .finally(() => {
                seTtaskReadLoading(false);
            });
    };
    useEffect(() => {
        taskRead();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card_header">
                    <div className="card_header_left">
                        <h2 className="card_header_left_main">タスク</h2>
                        <h3 className='card_header_left_sub'>{props.date}</h3>
                    </div>
                    <div className="card_header_right">
                        <IconButton onClick={onNewTask} color="primary" className='card_header_right_btn' component="span">
                            <AddIcon />
                        </IconButton>
                    </div>
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
                                    <ListItemText primary={task.name} secondary={`想定:${task.default_minute}分` + ` 実績:${task.work?.minute}分`} />
                                </ListItem>
                            </CardActionArea>
                        ))}
                    </div>
                }
            </div>

            <Dialog open={createWorkDialog} onClose={() => { setCreateWorkDialog(false); }}>
                {createWorkDialog &&
                    <CreateWork
                        onCloseMyself={() => { setCreateWorkDialog(false); }}
                        openCreateTaskDialog={() => { setCreateTaskDialog(true); }}
                        date={props.date}
                        taskRead={taskRead}
                        focusTask={focusTask}
                    />
                }
            </Dialog>

            <Dialog open={createTaskDialog} onClose={() => { setCreateTaskDialog(false); }}>
                {createTaskDialog &&
                    <CreateTask
                        onCloseMyself={() => {
                            setCreateTaskDialog(false);
                            setCreateWorkDialog(false);
                        }}
                        taskRead={taskRead}
                        focusTask={focusTask}
                    />
                }
            </Dialog>
            {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
        </>
    );
}