import { api } from "@/plugins/axios";
import { errHandler } from "@/data/common";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { Success } from "../types/success";
import { useSnackbar } from "../common/useSnackbar";

export const useDeleteWork = () => {
  const { setSnackbar } = useSnackbar();
  const [deleteWorkLoading, setDeleteWorkLoading] = useState(false);
  const [deleteWorkError, setDeleteWorkError] = useState("");
  const deleteWork = async (id: number) => {
    setDeleteWorkError("");
    setDeleteWorkLoading(true);
    return api({
      url: "/api/work/delete",
      method: "DELETE",
      data: { id },
    })
      .then((res: AxiosResponse<Success>) => {
        // setSnackbar(res.data.data.message);
        return res;
      })
      .catch((err) => {
        setSnackbar("活動情報の削除に失敗しました", "error");
        errHandler(err, setDeleteWorkError);
      })
      .finally(() => {
        setDeleteWorkLoading(false);
      });
  };

  return {
    deleteWork,
    deleteWorkError,
    deleteWorkLoading,
  };
};
