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
import { Friend } from "@/data/types/friend";
import { useSnackbar } from "@/data/common/useSnackbar";

const FriendItemNow = ({ friend, friendRead }: { friend: Friend; friendRead: () => void }) => {
  const { setSnackbar } = useSnackbar();
  const router = useRouter();
  const { deleteInvitation, isLoading } = useDeleteInvitation();

  const onClickDelete = async () => {
    const { name, invitation_id } = friend;
    if (!confirm(`「${name}」さんを友達から削除しますか？`)) return;
    const res = await deleteInvitation({ invitation_id });
    if (!res) return;
    friendRead();
    setSnackbar(`「${name}」さんを友達から削除しました`);
  };

  const onClickList = () => {
    router.push({
      pathname: "/friend/detail",
      query: {
        year: dayjs().format("YYYY"),
        month: dayjs().format("M"),
        id: friend.id,
        name: friend.name,
      },
    });
  };

  return (
    <ListItem sx={{ p: 0 }}>
      <Swiper slidesPerView="auto" style={{ width: "100%", alignItems: "stretch" }}>
        <SwiperSlide style={{ width: "100%", height: "auto" }}>
          <ListItemButton onClick={onClickList}>
            <ListItemAvatar>
              <UserImg fileName={friend.user_img} size="40" />
            </ListItemAvatar>
            <ListItemText primary={friend.name} secondary={friend.email} />
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
