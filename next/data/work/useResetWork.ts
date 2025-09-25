import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
import { ApiErr } from "@/data/types/apiErr";

export const useResetWork = () => {
  const { errHandler } = useErrHandler();
  const [resetWorkLoading, setResetWorkLoading] = useState(false);
  const [resetWorkError, setResetWorkError] = useState("");
  const resetWork = async () => {
    setResetWorkError("");
    setResetWorkLoading(true);
    return api({
      url: "/api/work/reset",
      method: "DELETE",
    })
      .then((res) => {
        return res;
      })
      .catch((err: ApiErr) => {
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
