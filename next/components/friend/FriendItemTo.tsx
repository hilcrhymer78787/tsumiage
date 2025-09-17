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
import { useDeleteInvitation } from "@/data/invitation/useDeleteInvitation";

const FriendItemTo = ({
  friend,
  friendRead,
}: {
  friend: apiInvitationResponseFriendType;
  friendRead: () => void;
}) => {
  const { deleteInvitation, deleteInvitationLoading } = useDeleteInvitation();
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
          {deleteInvitationLoading ? (
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
