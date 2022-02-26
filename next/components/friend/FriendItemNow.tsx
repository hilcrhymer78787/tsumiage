import * as React from 'react';
import { apiInvitationResponseFriendType } from '@/types/api/invitation/read/response';
import {
    Avatar,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';

type Props = {
    friend: apiInvitationResponseFriendType
    friendRead: any
}
export default function FriendItemNow(props: Props) {
    return (
        <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={() => { alert(); }}>
                <ListItemAvatar>
                    <Avatar src={props.friend.user_img} sx={{ border: '2px solid #1976d2' }}/>
                </ListItemAvatar>
                <ListItemText
                    primary={props.friend.name}
                    secondary={props.friend.email}
                />
            </ListItemButton>
        </ListItem>
    );
}
