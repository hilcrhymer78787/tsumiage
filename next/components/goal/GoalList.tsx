import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { CardActionArea, IconButton, Dialog, ListItem, Checkbox, ListItemAvatar, ListItemText, Avatar, CircularProgress } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import { api } from '@/plugins/axios';
import { apiTaskReadRequestType } from '@/types/api/task/read/request';
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';
import CreateWork from '@/components/task/CreateWork';
import CreateGoal from '@/components/goal/CreateGoal';
import { apiWorkDeleteRequestType } from '@/types/api/work/delete/request';
import { apiWorkCreateRequestType } from '@/types/api/work/create/request';
import moment from 'moment';
import { MINUTE } from '@/static/const';
import GoalItem from '@/components/goal/GoalItem';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { red, blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { apiGoalReadResponseType } from '@/types/api/goal/read/response';
import { apiGoalReadResponseGoalsType } from '@/types/api/goal/read/response';
type Props = {
    // date: string,
}
export default function GoalList(props: Props) {
    const [createWorkDialog, setCreateWorkDialog] = useState(false as boolean);
    const [createGoalDialog, setCreateGoalDialog] = useState(false as boolean);
    const [focusGoal, setFocusGoal] = useState(null as apiGoalReadResponseGoalsType | null);
    const [goals, setGoals] = useState([] as apiGoalReadResponseGoalsType[]);
    const [taskReadLoading, seTtaskReadLoading] = useState(false as boolean);
    const [workDeleteLoading, setWorkDeleteLoading] = useState(false as boolean);
    const [workCreateLoading, setWorkCreateLoading] = useState(false as boolean);

    const onFocusGoal = (e: React.MouseEvent<HTMLElement>) => {
        const clickedIndex = e.currentTarget.dataset.index;
        setFocusGoal(goals[clickedIndex]);
        setCreateWorkDialog(true);
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
            .then((res: AxiosResponse<apiGoalReadResponseType>) => {
                setGoals(res.data.goals);
            })
            .finally(() => {
                seTtaskReadLoading(false);
            });
    };

    // const workDelete = (e) => {
    //     const task = goal[e.currentTarget.dataset.index];
    //     if (!confirm(`${props.date}、「${task.name}」の実績を削除しますか？`)) {
    //         return;
    //     }
    //     const apiParam: apiWorkDeleteRequestType = {
    //         date: props.date,
    //         task_id: task.id
    //     };
    //     const requestConfig: AxiosRequestConfig = {
    //         url: `/api/work/delete`,
    //         method: "DELETE",
    //         data: apiParam
    //     };
    //     setWorkDeleteLoading(true);
    //     api(requestConfig)
    //         .then((res: AxiosResponse<apiTaskReadResponseType>) => {
    //             taskRead();
    //         })
    //         .finally(() => {
    //             setWorkDeleteLoading(false);
    //         });
    // };

    // const workCreate = (e) => {
    //     const task = goal[e.currentTarget.dataset.index];
    //     const apiParam: apiWorkCreateRequestType = {
    //         id: task.work.id,
    //         // date: props.date,
    //         task_id: task.id,
    //         minute: task.default_minute,
    //         memo: '',
    //     };
    //     const requestConfig: AxiosRequestConfig = {
    //         url: `/api/work/create`,
    //         method: "POST",
    //         data: apiParam
    //     };
    //     setWorkCreateLoading(true);
    //     api(requestConfig)
    //         .then((res) => {
    //             taskRead();
    //         })
    //         .finally(() => {
    //             setWorkCreateLoading(false);
    //         });
    // };

    useEffect(() => {
        goalRead();
    }, []);

    return (
        <>
            <Card>
                <CardHeader
                    action={
                        <IconButton onClick={() => { setCreateGoalDialog(true); }}>
                            <AddIcon sx={{ bgcolor: 'white', color: '#1976d2' }} />
                        </IconButton>
                    }
                    sx={{ bgcolor: '#1976d2', color: 'white' }}
                    title={`目標` + (goals.length ? `（${goals.length}件）` : '')}
                />
                {Boolean(goals.length) && goals.map((goal, index) => (
                    <GoalItem
                        goalRead={goalRead}
                        goal={goal}
                        key={index.toString()}
                    />
                ))}
            </Card>
            <Dialog open={createGoalDialog} onClose={() => { setCreateGoalDialog(false); }}>
                {createGoalDialog &&
                    <CreateGoal
                        onCloseMyself={() => {
                            setCreateGoalDialog(false);
                            goalRead();
                        }}
                        focusGoal={null}
                    />
                }
            </Dialog>
            {/* <pre>{JSON.stringify(goals, null, 2)}</pre> */}
        </>
    );
}