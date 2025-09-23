// export type 修正
import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";

export type Friend = {
  id: number;
  name: string;
  email: string;
  user_img: string;
  invitation_id: number;
};

export const useReadInvitation = () => {
  const [readInvitationLoading, setReadInvitationLoading] = useState(false);
  const [readInvitationError, setReadInvitationError] = useState("");
  const [fromFriends, setFromFriends] = useState<Friend[] | null>(null);
  const [nowFriends, setNowFriends] = useState<Friend[] | null>(null);
  const [toFriends, setToFriends] = useState<Friend[] | null>(null);
  const readInvitation = async () => {
    setReadInvitationError("");
    setReadInvitationLoading(true);
    return api({
      url: "/api/invitation/read",
      method: "GET",
    })
      .then((res) => {
        setFromFriends(res.data.data.fromFriends);
        setNowFriends(res.data.data.nowFriends);
        setToFriends(res.data.data.toFriends);
        return res;
      })
      .catch((err) => {
        errHandler(err, setReadInvitationError);
      })
      .finally(() => {
        setReadInvitationLoading(false);
      });
  };
  const isFirstLoading = [fromFriends, nowFriends, toFriends].every(
    (v) => v === null
  );

  return {
    fromFriends,
    nowFriends,
    toFriends,
    readInvitation,
    readInvitationError,
    isFirstLoading,
  };
};
