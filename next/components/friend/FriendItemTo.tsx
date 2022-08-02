import React from "react";
import { apiInvitationResponseFriendType } from "@/types/api/invitation/read/response";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import UserImg from "@/components/common/UserImg";
import { useInvitationApi } from "@/data/invitation";
import axios from "axios";

type Props = {
  friend: apiInvitationResponseFriendType
  friendRead: () => void
}
const FriendItemTo = (props: Props) => {
  const { invitationDelete, invitationDeleteLoading } = useInvitationApi();
  const apiInvitationDelete = async () => {
    if (!confirm(`「${props.friend.name}」さんの招待を中止しますか？`)) return;
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
  return (
    <ListItem sx={{ p: 0 }}
      secondaryAction={
        <IconButton onClick={apiInvitationDelete}>
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
    </ListItem >
  );
};
export default FriendItemTo;