import React from "react";
import { apiInvitationResponseFriendType } from "@/types/api/invitation/read/response";
import Router from "next/router";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import UserImg from "@/components/common/UserImg";
import dayjs from "dayjs";
type Props = {
  friend: apiInvitationResponseFriendType
  friendRead: () => void
}
const FriendItemNow = (props: Props) => {
  const nowYear = (): number => {
    return Number(dayjs().format("YYYY"));
  };
  const nowMonth = (): number => {
    return Number(dayjs().format("M"));
  };
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton onClick={() => {
        Router.push(`/friend/${props.friend.id}/${props.friend.name}/?year=${nowYear()}&month=${nowMonth()}`);
      }}>
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
};
export default FriendItemNow;