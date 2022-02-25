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
type Props = {
    friend: apiInvitationResponseFriendType
    friendRead: any
}
export default function FriendItemFrom(props: Props) {
    const [invitationDeleteLoading, setinvitationDeleteLoading] = React.useState<boolean>(false);
    const [invitationCreateLoading, setinvitationCreateLoading] = React.useState<boolean>(false);
    const invitationDelete = () => {
        if (!confirm(`「」を削除しますか？`)) {
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
    const invitationCreate = () => {
        const apiParam: apiInvitationCreateRequestType = {
            invitation_id: props.friend.invitation_id
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/invitation/create`,
            method: "POST",
            data: apiParam
        };
        setinvitationCreateLoading(true);
        api(requestConfig)
            .then((res: AxiosResponse) => {
                props.friendRead();
            })
            .finally(() => {
                setinvitationCreateLoading(false);
            });
    };
    return (
        <Card sx={{ m: '15px' }}>
            <CardHeader
                avatar={
                    <Avatar src={props.friend.user_img} />
                }
                onClick={() => { alert(); }}
                title={props.friend.name}
                subheader={props.friend.email}
            />
            <CardActions disableSpacing>
                <LoadingButton
                    onClick={invitationDelete}
                    color="error"
                    variant="contained"
                    loading={invitationDeleteLoading}
                    disabled={invitationCreateLoading}
                    children={<>拒否<DeleteIcon /></>}
                />
                <div></div>
                <LoadingButton
                    onClick={() => { alert(); }}
                    color="primary"
                    variant="contained"
                    loading={invitationCreateLoading}
                    disabled={invitationDeleteLoading}
                    children={<>許可<SendIcon /></>}
                />
            </CardActions>
        </Card>
    );
}
