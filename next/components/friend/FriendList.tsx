import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import FriendItemTo from "@/components/friend/FriendItemTo";
import FriendItemNow from "@/components/friend/FriendItemNow";
import FriendItemFrom from "@/components/friend/FriendItemFrom";
import { apiInvitationResponseType } from "@/types/api/invitation/read/response";
import CreateFriend from "@/components/friend/CreateFriend";
import {
  IconButton,
  Dialog,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useInvitationApi } from "@/data/invitation";
import axios from "axios";
const FriendList = () => {
  const { invitationRead, invitationReadLoading } = useInvitationApi();
  const [createInvitationDialog, setCreateInvitationDialog] = useState<boolean>(false);
  const [friendData, setFriendData] = useState<apiInvitationResponseType>({
    fromFriends: [],
    nowFriends: [],
    toFriends: [],
  });

  const apiFriendRead = async () => {
    try {
      const res = await invitationRead();
      setFriendData(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラーが発生しました");
      }
    }
  };

  useEffect(() => {
    apiFriendRead();
  }, []);

  return (
    <>
      <Card sx={{ mb: "20px" }}>
        <CardHeader
          action={
            <IconButton onClick={() => { setCreateInvitationDialog(true); }}>
              <AddIcon sx={{ bgcolor: "white", color: "#1976d2" }} />
            </IconButton>
          }
          title="友達"
        />
        {invitationReadLoading && !friendData.nowFriends.length && (
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              p: "30px"
            }}>
            <CircularProgress />
          </CardContent>
        )}
        {!invitationReadLoading && !friendData.nowFriends.length && (
          <CardContent
            sx={{
              textAlign: "center",
              p: "20px !important"
            }}>
            登録されている友達はいません
          </CardContent>
        )}
        {!!friendData.nowFriends.length && friendData.nowFriends.map((friend, index) => (
          <FriendItemNow
            friendRead={apiFriendRead}
            friend={friend}
            key={index.toString()}
          />
        ))}
      </Card>
      {!!friendData.fromFriends.length && (
        <Card sx={{ mb: "20px" }}>
          <CardHeader title="友達申請が来ています" />
          {friendData.fromFriends.map((friend, index) => (
            <FriendItemFrom
              friendRead={apiFriendRead}
              friend={friend}
              key={index.toString()}
            />
          ))}
        </Card>
      )}
      {!!friendData.toFriends.length && (
        <Card sx={{ mb: "20px" }}>
          <CardHeader title="友達申請中" />
          {friendData.toFriends.map((friend, index) => (
            <FriendItemTo
              friendRead={apiFriendRead}
              friend={friend}
              key={index.toString()}
            />
          ))}
        </Card>
      )}
      <Dialog open={createInvitationDialog}
        onClose={() => {
          setCreateInvitationDialog(false);
          apiFriendRead();
        }}>
        {createInvitationDialog && (
          <CreateFriend />
        )}
      </Dialog>
    </>
  );
};
export default FriendList;