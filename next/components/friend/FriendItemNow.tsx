import * as React from "react";
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
import moment from "moment";
type Props = {
    friend: apiInvitationResponseFriendType
    friendRead: any
}
export default function FriendItemNow (props: Props) {
  const nowYear = (): number => {
    return Number(moment().format("Y"));
  };
  const nowMonth = (): number => {
    return Number(moment().format("M"));
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
}
