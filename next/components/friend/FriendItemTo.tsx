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
import { Friend } from "@/data/types/friend";
import { useDeleteInvitation } from "@/data/invitation/useDeleteInvitation";

const FriendItemTo = ({
  friend,
  friendRead,
}: {
  friend: Friend;
  friendRead: () => void;
}) => {
  const { deleteInvitation, isLoading } = useDeleteInvitation();
  const apiInvitationDelete = async () => {
    if (!confirm(`「${friend.name}」さんの招待を中止しますか？`)) return;
    await deleteInvitation(friend.invitation_id);
    friendRead();
  };
  return (
    <ListItem
      sx={{ p: 0 }}
      secondaryAction={
        <IconButton onClick={apiInvitationDelete}>
          {isLoading ? (
            <CircularProgress color="error" size={25} />
          ) : (
            <CancelIcon color="error" />
          )}
        </IconButton>
      }
    >
      <ListItemButton>
        <ListItemAvatar>
          <UserImg fileName={friend.user_img} size="40" />
        </ListItemAvatar>
        <ListItemText primary={friend.name} secondary={friend.email} />
      </ListItemButton>
    </ListItem>
  );
};
export default FriendItemTo;
