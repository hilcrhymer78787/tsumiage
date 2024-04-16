import { useCallback, useState } from "react";

import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";

export type Work = {
  id: number;
  state: WorkState;
};

const workState = [0 , 1 , 2] as const;
export type WorkState = (typeof workState)[number]

export type workCreateData = {
  id: number;
  state: WorkState;
  date: string;
  task_id: number;
};

export const useCreateWork = () => {
  const [createWorkLoading, setCreateWorkLoading] = useState(false);
  const [createWorkError, setCreateWorkError] = useState("");
  const createWork = useCallback(async (data: workCreateData) => {
    setCreateWorkError("");
    setCreateWorkLoading(true);
    const requestConfig = {
      url: "/api/work/create",
      method: "POST",
      data,
    };
    return api(requestConfig as any)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setCreateWorkError);
      })
      .finally(() => {
        setCreateWorkLoading(false);
      });
  },[]);

  return {
    createWork,
    createWorkError,
    createWorkLoading,
  };
};
