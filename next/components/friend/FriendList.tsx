import React, { useState, useEffect } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { CardActionArea, IconButton, Dialog, ListItem, Checkbox, ListItemAvatar, ListItemText, Avatar, CircularProgress } from '@mui/material';
import { api } from '@/plugins/axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import { apiGoalReadResponseType } from '@/types/api/goal/read/response';
import { apiGoalReadResponseGoalsType } from '@/types/api/goal/read/response';
import FriendItemTo from '@/components/friend/FriendItemTo';
import FriendItemNow from '@/components/friend/FriendItemNow';
import FriendItemFrom from '@/components/friend/FriendItemFrom';
import { apiInvitationResponseType } from '@/types/api/invitation/read/response';
import { apiInvitationResponseFriendType } from '@/types/api/invitation/read/response';
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
    } as apiInvitationResponseType);
    const [friendReadLoading, setFriendReadLoading] = useState(false as boolean);

    const [taskReadLoading, seTtaskReadLoading] = useState(false as boolean);
    const [workDeleteLoading, setWorkDeleteLoading] = useState(false as boolean);
    const [workCreateLoading, setWorkCreateLoading] = useState(false as boolean);

    const friendRead = () => {
        const requestConfig: AxiosRequestConfig = {
            url: `/api/invitation/read`,
            method: "GET",
        };
        setFriendReadLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse<apiInvitationResponseType>) => {
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
                            friendRead={friendRead}
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
                        friendRead={friendRead}
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
                        <FriendItemTo
                            friendRead={friendRead}
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