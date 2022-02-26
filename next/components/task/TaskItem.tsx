import React, { useState, useEffect } from 'react';
import { api } from '@/plugins/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import CreateWork from '@/components/task/CreateWork';
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';
import { apiWorkDeleteRequestType } from '@/types/api/work/delete/request';
import { apiWorkCreateRequestType } from '@/types/api/work/create/request';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
    CardActionArea,
    Dialog,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    CircularProgress
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
type Props = {
    task: apiTaskReadResponseTaskType,
    date: string
    taskRead: any
}
export default function TaskItem(props: Props) {
    const [workDeleteLoading, setWorkDeleteLoading] = useState(false as boolean);
    const [workCreateLoading, setWorkCreateLoading] = useState(false as boolean);
    const [createWorkDialog, setCreateWorkDialog] = useState(false as boolean);
    const workDelete = () => {
        if (!confirm(`${props.date}、「${props.task.name}」の実績を削除しますか？`)) {
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
                props.taskRead();
            })
            .finally(() => {
                setWorkDeleteLoading(false);
            });
    };
    const workCreate = (e) => {
        const apiParam: apiWorkCreateRequestType = {
            id: props.task.work.id,
            date: props.date,
            task_id: props.task.id,
            minute: props.task.default_minute,
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
                props.taskRead();
            })
            .finally(() => {
                setWorkCreateLoading(false);
            });
    };
    return (
        <>
            <CardActionArea >
                <ListItem
                    secondaryAction={props.task.work.id ?
                        <CheckBoxIcon
                            onClick={workDelete}
                            color="primary"
                        />
                        :
                        <CheckBoxOutlineBlankIcon
                            onClick={workCreate}
                            color="disabled"
                        />
                    }>
                    <ListItemAvatar onClick={() => { setCreateWorkDialog(true); }}>
                        <Avatar sx={{ bgcolor: Boolean(props.task.work.id) ? '#1976d2' : '' }}>
                            <TaskOutlinedIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        onClick={() => { setCreateWorkDialog(true); }}
                        primary={props.task.name} secondary={`想定:${props.task.default_minute}分` + ` 実績:${props.task.work?.minute}分`}
                    />
                </ListItem>
            </CardActionArea>
            <Dialog open={createWorkDialog} onClose={() => { setCreateWorkDialog(false); }}>
                {createWorkDialog &&
                    <CreateWork
                        onCloseMyself={() => { 
                            setCreateWorkDialog(false); 
                            props.taskRead()
                        }}
                        date={props.date}
                        task={props.task}
                    />
                }
            </Dialog>
        </>
    );
}
