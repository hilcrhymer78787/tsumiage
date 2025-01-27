import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
export const useResetWork = () => {
  const [resetWorkLoading, setResetWorkLoading] = useState(false);
  const [resetWorkError, setResetWorkError] = useState("");
  const resetWork = async () => {
    setResetWorkError("");
    setResetWorkLoading(true);
    const requestConfig = {
      url: "/api/work/reset",
      method: "DELETE",
    };
    return api(requestConfig as any)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        errHandler(err, setResetWorkError);
      })
      .finally(() => {
        setResetWorkLoading(false);
      });
  };

  return {
    resetWork,
    resetWorkError,
    resetWorkLoading,
  };
};
