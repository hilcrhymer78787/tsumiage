import { useCallback, useState } from "react";

import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { WorkState } from "@/data/types/work";

export type workCreateData = {
  state: WorkState;
  date: string;
  task_id: number;
};

export const useCreateWork = () => {
  const [createWorkLoading, setCreateWorkLoading] = useState(false);
  const [createWorkError, setCreateWorkError] = useState("");
  const createWork = async (data: workCreateData) => {
    setCreateWorkError("");
    setCreateWorkLoading(true);
    return api({
      url: "/api/work/create",
      method: "POST",
      data,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setCreateWorkError);
      })
      .finally(() => {
        setCreateWorkLoading(false);
      });
  };

  return {
    createWork,
    createWorkError,
    createWorkLoading,
  };
};
