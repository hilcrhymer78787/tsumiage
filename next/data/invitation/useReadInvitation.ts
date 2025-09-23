// export type 修正
import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import { Friend } from "@/data/types/friend";
import { AxiosResponse } from "axios";
type Response = {
  data: {
    fromFriends: Friend[];
    nowFriends: Friend[];
    toFriends: Friend[];
  };
};
export const useReadInvitation = () => {
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
      .then((res: AxiosResponse<Response>) => {
        setFromFriends(res.data.data.fromFriends);
        setNowFriends(res.data.data.nowFriends);
        setToFriends(res.data.data.toFriends);
        return res;
      })
      .catch((err) => {
        errHandler(err, setError);
      })
      .finally(() => {
        setIsLoading(false);
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
    isLoading,
    error,
    isFirstLoading,
  };
};
