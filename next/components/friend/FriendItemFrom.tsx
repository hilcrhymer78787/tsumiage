import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import UserImg from "@/components/common/UserImg";
import { ListItem, ListItemAvatar, ListItemText, Card, CardActions, Box } from "@mui/material";
import { useDeleteInvitation } from "@/data/invitation/useDeleteInvitation";
import { Friend } from "@/data/types/friend";
import { useUpdateInvitation } from "@/data/invitation/useUpdateInvitation";
import { useSnackbar } from "@/data/common/useSnackbar";

const FriendItemFrom = ({ friend, friendRead }: { friend: Friend; friendRead: () => void }) => {
  const { setSnackbar } = useSnackbar();
  const { invitation_id, name, user_img, email } = friend;
  const { deleteInvitation, isLoading: deleteLoading } = useDeleteInvitation();
  const { updateInvitation, isLoading: updateLoading } = useUpdateInvitation();
  const onClickDelete = async () => {
    if (!confirm(`「${name}」さんからの招待を拒否しますか？`)) return;
    const res = await deleteInvitation({ invitation_id });
    if (!res) return;
    friendRead();
    setSnackbar(`「${name}」さんからの招待を拒否しました`);
  };
  const onClickUpdate = async () => {
    const res = await updateInvitation({ invitation_id });
    if (!res) return;
    friendRead();
  };
  return (
    <Card sx={{ m: "15px" }}>
      <ListItem sx={{ border: "none !important" }}>
        <ListItemAvatar>
          <UserImg fileName={user_img} size="40" />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={email} />
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
        <Box />
        <LoadingButton
          onClick={onClickUpdate}
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
