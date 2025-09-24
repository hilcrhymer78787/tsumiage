import { api } from "@/plugins/axios";
import { useErrHandler } from "@/data/common/useErrHandler";
import { useState } from "react";
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
