import * as React from "react";
import { LoadingButton } from "@mui/lab";
import { api } from "@/plugins/axios";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { apiInvitationResponseFriendType } from "@/types/api/invitation/read/response";
import { apiInvitationDeleteRequestType } from "@/types/api/invitation/delete/request";
import { apiInvitationUpdateRequestType } from "@/types/api/invitation/update/request";
import UserImg from "@/components/common/UserImg";
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Card,
    CardActions,
} from "@mui/material";
type Props = {
    friend: apiInvitationResponseFriendType
    friendRead: any
}
export default function FriendItemFrom (props: Props) {
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
            url: "/api/invitation/delete",
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
            url: "/api/invitation/update",
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
        <Card sx={{ m: "15px" }}>
            <ListItem sx={{ border: "none !important" }}>
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
            </ListItem>
            <CardActions disableSpacing>
                <LoadingButton
                    onClick={invitationDelete}
                    color="error"
                    variant="contained"
                    loading={invitationDeleteLoading}
                    disabled={invitationUpdateLoading}>
                    拒否<DeleteIcon />
                </LoadingButton>
                <div></div>
                <LoadingButton
                    onClick={invitationUpdate}
                    color="primary"
                    variant="contained"
                    loading={invitationUpdateLoading}
                    disabled={invitationDeleteLoading}>
                    許可<SendIcon />
                </LoadingButton>
            </CardActions>
        </Card>
    );
}
