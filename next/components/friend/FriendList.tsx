import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import CreateFriend from "@/components/friend/CreateFriend";
import FriendItemFrom from "@/components/friend/FriendItemFrom";
import FriendItemNow from "@/components/friend/FriendItemNow";
import FriendItemTo from "@/components/friend/FriendItemTo";
import { apiInvitationResponseType } from "@/types/api/invitation/read/response";
import axios from "axios";
import { useReadInvitation } from "@/data/invitation/useReadInvitation";

const FriendList = () => {
  const {
    fromFriends,
    nowFriends,
    toFriends,
    readInvitation,
    readInvitationLoading,
  } = useReadInvitation();

  const [createInvitationDialog, setCreateInvitationDialog] =
    useState<boolean>(false);

  useEffect(() => {
    readInvitation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card sx={{ mb: "20px" }}>
        <CardHeader
          action={
            <Button onClick={() => setCreateInvitationDialog(true)}>
              <AddIcon color="primary" />
              申請
            </Button>
          }
          title="友達"
        />
        {readInvitationLoading && !nowFriends?.length && (
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              p: "30px",
            }}
          >
            <CircularProgress />
          </CardContent>
        )}
        {!readInvitationLoading && !nowFriends?.length && (
          <CardContent
            sx={{
              textAlign: "center",
              p: "20px !important",
            }}
          >
            登録されている友達はいません
          </CardContent>
        )}
        {!!nowFriends?.length &&
          nowFriends.map((friend, index) => (
            <FriendItemNow
              friendRead={readInvitation}
              friend={friend}
              key={index.toString()}
            />
          ))}
      </Card>
      {!!fromFriends?.length && (
        <Card sx={{ mb: "20px" }}>
          <CardHeader title="友達申請が来ています" />
          {fromFriends.map((friend, index) => (
            <FriendItemFrom
              friendRead={readInvitation}
              friend={friend}
              key={index.toString()}
            />
          ))}
        </Card>
      )}
      {!!toFriends?.length && (
        <Card sx={{ mb: "20px" }}>
          <CardHeader title="友達申請中" />
          {toFriends.map((friend, index) => (
            <FriendItemTo
              friendRead={readInvitation}
              friend={friend}
              key={index.toString()}
            />
          ))}
        </Card>
      )}
      <Dialog
        open={createInvitationDialog}
        onClose={() => {
          setCreateInvitationDialog(false);
          readInvitation();
        }}
      >
        {createInvitationDialog && <CreateFriend />}
      </Dialog>
    </>
  );
};
export default FriendList;
