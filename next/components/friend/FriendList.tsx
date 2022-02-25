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
import FriendItemTo from '@/components/friend/FriendItemTo';
import FriendItemNow from '@/components/friend/FriendItemNow';
import FriendItemFrom from '@/components/friend/FriendItemFrom';
import { apiFriendReadResponseType } from '@/types/api/friend/read/response';
import { apiFriendReadResponseFriendType } from '@/types/api/friend/read/response';
type Props = {
    // date: string,
}
export default function GoalList(props: Props) {
    const [createWorkDialog, setCreateWorkDialog] = useState(false as boolean);
    const [createGoalDialog, setCreateGoalDialog] = useState(false as boolean);
    const [focusGoal, setFocusGoal] = useState(null as apiGoalReadResponseGoalsType | null);
    const [goals, setGoals] = useState([] as apiGoalReadResponseGoalsType[]);

    const [friendData, setFriendData] = useState({
        fromFriends: [],
        nowFriends: [],
        toFriends: [],
    } as apiFriendReadResponseType);
    const [friendReadLoading, setFriendReadLoading] = useState(false as boolean);

    const [taskReadLoading, seTtaskReadLoading] = useState(false as boolean);
    const [workDeleteLoading, setWorkDeleteLoading] = useState(false as boolean);
    const [workCreateLoading, setWorkCreateLoading] = useState(false as boolean);

    const friendRead = () => {
        const requestConfig: AxiosRequestConfig = {
            url: `/api/friend/read`,
            method: "GET",
        };
        setFriendReadLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiFriendReadResponseType>) => {
                setFriendData(res.data);
            })
            .finally(() => {
                setFriendReadLoading(false);
            });
    };

    useEffect(() => {
        friendRead();
    }, []);

    return (
        <>
            {Boolean(friendData.fromFriends.length) &&
                <Card sx={{ mb: '20px' }}>
                    <CardHeader
                        sx={{ bgcolor: '#1976d2', color: 'white' }}
                        title={`友達申請が来ています`}
                    />
                    {friendData.fromFriends.map((friend, index) => (
                        <FriendItemFrom
                            friend={friend}
                            key={index.toString()}
                        />
                    ))}
                </Card>
            }
            <Card sx={{ mb: '20px' }}>
                <CardHeader
                    action={
                        <IconButton onClick={() => { setCreateGoalDialog(true); }}>
                            <AddIcon sx={{ bgcolor: 'white', color: '#1976d2' }} />
                        </IconButton>
                    }
                    sx={{ bgcolor: '#1976d2', color: 'white' }}
                    title={`友達`}
                />
                {Boolean(friendData.nowFriends.length) && friendData.nowFriends.map((friend, index) => (
                    <FriendItemNow
                        friend={friend}
                        key={index.toString()}
                    />
                ))}
            </Card>
            {Boolean(friendData.toFriends.length) &&
                <Card sx={{ mb: '20px' }}>
                    <CardHeader
                        sx={{ bgcolor: '#1976d2', color: 'white' }}
                        title={`友達申請中`}
                    />
                    {friendData.toFriends.map((friend, index) => (
                        <FriendItemNow
                            friend={friend}
                            key={index.toString()}
                        />
                    ))}
                </Card>
            }
            {/* <Dialog open={createGoalDialog} onClose={() => { setCreateGoalDialog(false); }}>
                {createGoalDialog &&
                    <CreateGoal
                        onCloseMyself={() => {
                            setCreateGoalDialog(false);
                            goalRead();
                        }}
                        focusGoal={null}
                    />
                }
            </Dialog> */}
        </>
    );
}