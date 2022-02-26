import * as React from 'react';
import { api } from '@/plugins/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { apiInvitationResponseFriendType } from '@/types/api/invitation/read/response';
import { apiInvitationDeleteRequestType } from '@/types/api/invitation/delete/request';
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    CircularProgress,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
    friend: apiInvitationResponseFriendType
    friendRead: any
}
export default function FriendItemTo(props: Props) {
    const [invitationDeleteLoading, setinvitationDeleteLoading] = React.useState<boolean>(false);
    const invitationDelete = () => {
        if (!confirm(`「${props.friend.name}」さんの招待を中止しますか？`)) {
            return;
        }
        const apiParam: apiInvitationDeleteRequestType = {
            invitation_id: props.friend.invitation_id
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/invitation/delete`,
            method: "DELETE",
            data: apiParam
        };
        setinvitationDeleteLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse) => {
                props.friendRead();
            })
            .finally(() => {
                setinvitationDeleteLoading(false);
            });
    };
    return (
        <ListItem sx={{ p: 0 }}
            secondaryAction={
                <IconButton onClick={invitationDelete}>
                    {invitationDeleteLoading ?
                        <CircularProgress color="error" size={25} />
                        :
                        <CancelIcon color="error" />
                    }
                </IconButton>
            }
        >
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar src={props.friend.user_img} />
                </ListItemAvatar>
                <ListItemText
                    primary={props.friend.name}
                    secondary={props.friend.email}
                />
            </ListItemButton>
        </ListItem >
    );
}
