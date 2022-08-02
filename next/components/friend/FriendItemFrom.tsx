import React from "react";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiInvitationResponseFriendType } from "@/types/api/invitation/read/response";
import UserImg from "@/components/common/UserImg";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardActions,
} from "@mui/material";
import { useInvitationApi } from "@/data/invitation";
import axios from "axios";
type Props = {
  friend: apiInvitationResponseFriendType
  friendRead: () => void
}
const FriendItemFrom = (props: Props) => {
  const { invitationDelete, invitationDeleteLoading, invitationUpdate, invitationUpdateLoading } = useInvitationApi();
  const apiInvitationDelete = async () => {
    if (!confirm(`「${props.friend.name}」さんからの招待を拒否しますか？`)) return;
    try {
      await invitationDelete({
        invitation_id: props.friend.invitation_id
      });
      props.friendRead();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラーが発生しました");
      }
    }
  };
  const apiInvitationUpdate = async () => {
    try {
      await invitationUpdate({
        invitation_id: props.friend.invitation_id
      });
      props.friendRead();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラーが発生しました");
      }
    }
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
          onClick={apiInvitationDelete}
          color="error"
          variant="contained"
          loading={invitationDeleteLoading}
          disabled={invitationUpdateLoading}>
          拒否<DeleteIcon />
        </LoadingButton>
        <div></div>
        <LoadingButton
          onClick={apiInvitationUpdate}
          color="primary"
          variant="contained"
          loading={invitationUpdateLoading}
          disabled={invitationDeleteLoading}>
          許可<SendIcon />
        </LoadingButton>
      </CardActions>
    </Card>
  );
};
export default FriendItemFrom;