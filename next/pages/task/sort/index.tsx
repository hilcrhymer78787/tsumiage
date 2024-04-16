import React, { useCallback, useEffect, useMemo } from "react";

import ErrTxt from "@/components/common/ErrTxt";
import Layout from "@/layouts/default";
import Loading from "@/components/common/Loading";
import NoData from "@/components/common/NoData";
import Sortable from "@/components/common/Sortable";
import dayjs from "dayjs";
import { loginInfoAtom } from "@/data/user";
import { useReadTasks } from "@/data/task/useReadTasks";
import { useRecoilValue } from "recoil";

const TaskSort = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const { tasks, readTasks, readTasksLoading, readTasksError } = useReadTasks();
  const apiTaskRead = async () => {
    await readTasks(dayjs().format("YYYY-MM-DD"), loginInfo?.id ?? 0);
  };

  const TaskSortContent = useCallback(() => {
    if (!!readTasksError) return <ErrTxt txt={readTasksError} />;
    if (tasks === null) {
      if (readTasksLoading) return <Loading />;
      return <></>;
    }
    if (!tasks.length) return <NoData txt="登録されているタスクはありません"/>;
    return <Sortable />;
  }, [readTasksLoading, readTasksError, tasks]);

  useEffect(() => {
    apiTaskRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <TaskSortContent />
      {process.env.NODE_ENV === "development" && (
        <pre>{JSON.stringify(tasks, null, 4)}</pre>
      )}
    </Layout>
  );
};
export default TaskSort;
