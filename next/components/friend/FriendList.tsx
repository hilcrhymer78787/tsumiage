import { Button, Card, CardHeader, Dialog, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import CreateFriend from "@/components/friend/CreateFriend";
import FriendItemFrom from "@/components/friend/FriendItemFrom";
import FriendItemNow from "@/components/friend/FriendItemNow";
import FriendItemTo from "@/components/friend/FriendItemTo";
import { useReadInvitation } from "@/data/invitation/useReadInvitation";
import ApiHandle from "@/components/common/ApiHandle";

const FriendList = () => {
  const { fromFriends, nowFriends, toFriends, readInvitation, error, isFirstLoading } =
    useReadInvitation();

  const [createInvitationDialog, setCreateInvitationDialog] = useState(false);

  useEffect(() => {
    readInvitation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack gap={5}>
      <Card>
        <CardHeader
          action={
            <Button onClick={() => setCreateInvitationDialog(true)}>
              <AddIcon />
              申請
            </Button>
          }
          title="友達"
        />
        <ApiHandle
          isLoading={isFirstLoading}
          isError={!!error}
          isNoData={nowFriends?.length === 0}
          errorTxt="データの取得に失敗しました。"
          noDataTxt="登録されている友達はいません"
          p={5}
        >
          {nowFriends?.map((friend) => (
            <FriendItemNow friendRead={readInvitation} friend={friend} key={friend.id} />
          ))}
        </ApiHandle>
      </Card>
      {!!fromFriends?.length && (
        <Card>
          <CardHeader title="友達申請が来ています" />
          {fromFriends.map((friend) => (
            <FriendItemFrom friendRead={readInvitation} friend={friend} key={friend.id} />
          ))}
        </Card>
      )}
      {!!toFriends?.length && (
        <Card>
          <CardHeader title="友達申請中" />
          {toFriends.map((friend) => (
            <FriendItemTo friendRead={readInvitation} friend={friend} key={friend.id} />
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
    </Stack>
  );
};
export default FriendList;
