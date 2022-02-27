import * as React from 'react';
import { apiInvitationResponseFriendType } from '@/types/api/invitation/read/response';
import {
    Avatar,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';
import UserImg from '@/components/common/UserImg'

type Props = {
    friend: apiInvitationResponseFriendType
    friendRead: any
}
export default function FriendItemNow(props: Props) {
    return (
        <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={() => { alert(); }}>
                <ListItemAvatar>
                    <UserImg
                        fileName={props.friend.user_img}
                        size="40"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={props.friend.name}
                    secondary={props.friend.email}
                />
            </ListItemButton>
        </ListItem>
    );
}
