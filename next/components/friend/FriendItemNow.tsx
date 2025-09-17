import "swiper/css";

import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import { LoadingButton } from "@mui/lab";
import UserImg from "@/components/common/UserImg";
import dayjs from "dayjs";
import { useDeleteInvitation } from "@/data/invitation/useDeleteInvitation";
import { useRouter } from "next/router";
import { Friend } from "@/data/invitation/useReadInvitation";

const FriendItemNow = (props: {
  friend: Friend;
  friendRead: () => void;
}) => {
  const router = useRouter();
  const { deleteInvitation, isLoading } = useDeleteInvitation();
  const onClickDelete = async () => {
    if (!confirm(`「${props.friend.name}」さんを友達から削除しますか？`))
      return;
    const res = await deleteInvitation(props.friend.invitation_id);
    if (res) {
      props.friendRead();
    } else {
      alert("削除に失敗しました");
    }
  };
  return (
    <ListItem sx={{ p: 0 }}>
      <Swiper
        slidesPerView="auto"
        style={{ width: "100%", alignItems: "stretch" }}
      >
        <SwiperSlide style={{ width: "100%", height: "auto" }}>
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
        </SwiperSlide>
        <SwiperSlide style={{ height: "auto", width: "150px" }}>
          <Box className="flexCenter" sx={{ height: "100%" }}>
            <LoadingButton
              loading={isLoading}
              onClick={onClickDelete}
              color="error"
              variant="contained"
            >
              削除
            </LoadingButton>
          </Box>
        </SwiperSlide>
      </Swiper>
    </ListItem>
  );
};
export default FriendItemNow;
