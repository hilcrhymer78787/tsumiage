import React from "react";
import TaskList from "@/components/task/TaskList";
import Layout from "@/layouts/default";
import dayjs from "dayjs";
import { loginInfoAtom } from "@/data/user";
import { useRecoilValue } from "recoil";
function Task() {
  const loginInfo = useRecoilValue(loginInfoAtom);
  return (
    <Layout>
      <TaskList
        date={dayjs().format("YYYY-MM-DD")}
        userId={loginInfo?.id ?? 0}
        readonly={false}
      />
    </Layout>
  );
}
export default Task;