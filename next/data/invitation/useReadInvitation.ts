import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { Friend } from "@/data/types/friend";
import { CmnErr } from "@/data/types/cmnErr";
import { CmnRes } from "@/data/types/cmnRes";
type ApiReq = {};
type ApiRes = CmnRes<{
  fromFriends: Friend[];
  nowFriends: Friend[];
  toFriends: Friend[];
}>;
type ApiErr = CmnErr;
export const useReadInvitation = () => {
  const { errHandler } = useErrHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromFriends, setFromFriends] = useState<Friend[] | null>(null);
  const [nowFriends, setNowFriends] = useState<Friend[] | null>(null);
  const [toFriends, setToFriends] = useState<Friend[] | null>(null);
  const readInvitation = async () => {
    setError("");
    setIsLoading(true);
    return api({
      url: "/api/invitation/read",
      method: "GET",
    })
      .then((res: ApiRes) => {
        setFromFriends(res.data.data.fromFriends);
        setNowFriends(res.data.data.nowFriends);
        setToFriends(res.data.data.toFriends);
        return res;
      })
      .catch((err: ApiErr) => {
        errHandler(err, setError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const isFirstLoading = [fromFriends, nowFriends, toFriends].every((v) => v === null);

  return {
    fromFriends,
    nowFriends,
    toFriends,
    readInvitation,
    isLoading,
    error,
    isFirstLoading,
  };
};
