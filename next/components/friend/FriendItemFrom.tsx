import * as React from 'react';
import { LoadingButton } from '@mui/lab';
import { api } from '@/plugins/axios';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { Avatar } from '@mui/material';
import { apiInvitationResponseFriendType } from '@/types/api/invitation/read/response';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import { apiInvitationDeleteRequestType } from '@/types/api/invitation/delete/request';
import { apiInvitationUpdateRequestType } from '@/types/api/invitation/update/request';
type Props = {
    friend: apiInvitationResponseFriendType
    friendRead: any
}
export default function FriendItemFrom(props: Props) {
    const [invitationDeleteLoading, setinvitationDeleteLoading] = React.useState<boolean>(false);
    const [invitationUpdateLoading, setInvitationUpdateLoading] = React.useState<boolean>(false);
    const invitationDelete = () => {
        if (!confirm(`「${props.friend.name}」さんからの招待を拒否しますか？`)) {
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
    const invitationUpdate = () => {
        const apiParam: apiInvitationUpdateRequestType = {
            invitation_id: props.friend.invitation_id
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/invitation/update`,
            method: "PUT",
            data: apiParam
        };
        setInvitationUpdateLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse) => {
                props.friendRead();
            })
            .finally(() => {
                setInvitationUpdateLoading(false);
            });
    };
    return (
        <Card sx={{ m: '15px' }}>
            <CardHeader
                avatar={
                    <Avatar src={props.friend.user_img} />
                }
                title={props.friend.name}
                subheader={props.friend.email}
            />
            <CardActions disableSpacing>
                <LoadingButton
                    onClick={invitationDelete}
                    color="error"
                    variant="contained"
                    loading={invitationDeleteLoading}
                    disabled={invitationUpdateLoading}
                >拒否<DeleteIcon /></LoadingButton>
                <div></div>
                <LoadingButton
                    onClick={invitationUpdate}
                    color="primary"
                    variant="contained"
                    loading={invitationUpdateLoading}
                    disabled={invitationDeleteLoading}
                >許可<SendIcon /></LoadingButton>
            </CardActions>
        </Card>
    );
}
