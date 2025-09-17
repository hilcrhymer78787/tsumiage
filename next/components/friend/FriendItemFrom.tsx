import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import UserImg from "@/components/common/UserImg";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardActions,
  Box,
} from "@mui/material";
import { useDeleteInvitation } from "@/data/invitation/useDeleteInvitation";
import { Friend } from "@/data/invitation/useReadInvitation";
import { useUpdateInvitation } from "@/data/invitation/useUpdateInvitation";

const FriendItemFrom = ({
  friend,
  friendRead,
}: {
  friend: Friend;
  friendRead: () => void;
}) => {
  const { deleteInvitation, isLoading: deleteLoading } = useDeleteInvitation();
  const { updateInvitation, isLoading: updateLoading } = useUpdateInvitation();
  const onClickDelete = async () => {
    if (!confirm(`「${friend.name}」さんからの招待を拒否しますか？`)) return;
    await deleteInvitation(friend.invitation_id);
    friendRead();
  };
  const onClickUpdate = async () => {
    await updateInvitation(friend.invitation_id);
    friendRead();
  };
  return (
    <Card sx={{ m: "15px" }}>
      <ListItem sx={{ border: "none !important" }}>
        <ListItemAvatar>
          <UserImg fileName={friend.user_img} size="40" />
        </ListItemAvatar>
        <ListItemText primary={friend.name} secondary={friend.email} />
      </ListItem>
      <CardActions disableSpacing>
        <LoadingButton
          onClick={onClickDelete}
          color="error"
          variant="contained"
          loading={deleteLoading}
          disabled={updateLoading}
        >
          拒否
          <DeleteIcon />
        </LoadingButton>
        <Box></Box>
        <LoadingButton
          onClick={onClickUpdate}
          color="primary"
          variant="contained"
          loading={updateLoading}
          disabled={deleteLoading}
        >
          許可
          <SendIcon />
        </LoadingButton>
      </CardActions>
    </Card>
  );
};
export default FriendItemFrom;
