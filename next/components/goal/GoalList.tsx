import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { CardActionArea, IconButton, Dialog, ListItem, Checkbox, ListItemAvatar, ListItemText, Avatar, CircularProgress } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import { api } from '@/plugins/axios';
import { apiTaskReadRequestType } from '@/types/api/task/read/request';
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';
import CreateWork from '@/components/task/CreateWork';
import CreateTask from '@/components/task/CreateTask';
import { apiWorkDeleteRequestType } from '@/types/api/work/delete/request';
import { apiWorkCreateRequestType } from '@/types/api/work/create/request';
import moment from 'moment';
import { MINUTE } from '@/static/const';
type Props = {
    // date: string,
}
export default function GoalList(props: Props) {
    const [createWorkDialog, setCreateWorkDialog] = useState(false as boolean);
    const [createTaskDialog, setCreateTaskDialog] = useState(false as boolean);
    const [focusTask, setFocusTask] = useState(null as apiTaskReadResponseTaskType | null);
    const [goal, setGoals] = useState(null);
    const [taskReadLoading, seTtaskReadLoading] = useState(false as boolean);
    const [workDeleteLoading, setWorkDeleteLoading] = useState(false as boolean);
    const [workCreateLoading, setWorkCreateLoading] = useState(false as boolean);

    const onFocusTask = (e: React.MouseEvent<HTMLElement>) => {
        const clickedIndex = e.currentTarget.dataset.index;
        setFocusTask(goal[clickedIndex]);
        setCreateWorkDialog(true);
    };

    const onNewTask = () => {
        setFocusTask(null);
        setCreateTaskDialog(true);
    };

    const goalRead = () => {
        const params: apiTaskReadRequestType = {
            date: '',
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/goal/read`,
            method: "GET",
            params: params
        };
        seTtaskReadLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                setGoals(res.data);
            })
            .finally(() => {
                seTtaskReadLoading(false);
            });
    };

    const workDelete = (e) => {
        const task = goal[e.currentTarget.dataset.index];
        if (!confirm(`${props.date}、「${task.name}」の実績を削除しますか？`)) {
            return;
        }
        const apiParam: apiWorkDeleteRequestType = {
            date: props.date,
            task_id: task.id
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/work/delete`,
            method: "DELETE",
            data: apiParam
        };
        setWorkDeleteLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiTaskReadResponseType>) => {
                taskRead();
            })
            .finally(() => {
                setWorkDeleteLoading(false);
            });
    };

    const workCreate = (e) => {
        const task = goal[e.currentTarget.dataset.index];
        const apiParam: apiWorkCreateRequestType = {
            id: task.work.id,
            date: props.date,
            task_id: task.id,
            minute: task.default_minute,
            memo: '',
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/work/create`,
            method: "POST",
            data: apiParam
        };
        setWorkCreateLoading(true);
        api(requestConfig)
            .then((res) => {
                taskRead();
            })
            .finally(() => {
                setWorkCreateLoading(false);
            });
    };

    useEffect(() => {
        goalRead();
    }, []);

    return (
        <>
            {/* <div className="card">
                <div className="card_header">
                    <div className="card_header_left">
                        <h2 className="card_header_left_main">目標</h2>
                    </div>
                    <div className="card_header_right">
                        <IconButton onClick={onNewTask} className='card_header_right_btn' component="span">
                            <AddIcon color="primary" />
                        </IconButton>
                    </div>
                </div>
                {taskReadLoading && !Boolean(goal.length) &&
                    <div className='d-flex justify-center pa-5 ma-5'>
                        <CircularProgress />
                    </div>
                }
                {Boolean(goal.length) &&
                    <div>
                        {goal.map((task, index) => (
                            <CardActionArea key={index.toString()}>
                                <ListItem
                                    secondaryAction={task.work.id ?
                                        <CheckBoxIcon
                                            data-index={index}
                                            onClick={workDelete}
                                            color="primary"
                                        />
                                        :
                                        <CheckBoxOutlineBlankIcon
                                            data-index={index}
                                            onClick={workCreate}
                                            color="disabled"
                                        />
                                    }>
                                    <ListItemAvatar onClick={onFocusTask} data-index={index}>
                                        <Avatar sx={{ bgcolor: Boolean(task.work.id) ? '#1976d2' : '' }}>
                                            <TaskOutlinedIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        onClick={onFocusTask} data-index={index}
                                        primary={task.name} secondary={`想定:${task.default_minute}分` + ` 実績:${task.work?.minute}分`}
                                    />
                                </ListItem>
                            </CardActionArea>
                        ))}
                    </div>
                }
            </div> */}

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
            <pre>{JSON.stringify(goal, null, 2)}</pre>
        </>
    );
}