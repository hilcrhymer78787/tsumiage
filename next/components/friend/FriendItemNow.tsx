import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import React from "react";
import UserImg from "@/components/common/UserImg";
import { apiInvitationResponseFriendType } from "@/types/api/invitation/read/response";
import dayjs from "dayjs";
import { useRouter } from "next/router";

type Props = {
  friend: apiInvitationResponseFriendType;
  friendRead: () => void;
};
const FriendItemNow = (props: Props) => {
  const router = useRouter();
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton
        onClick={() => {
          router.push({
            pathname: "/friend/detail",
            query: {
              year: dayjs().format("YYYY"),
              month: dayjs().format("M"),
              id: props.friend.id,
              name: props.friend.name,
            },
          });
        }}
      >
        <ListItemAvatar>
          <UserImg fileName={props.friend.user_img} size="40" />
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
