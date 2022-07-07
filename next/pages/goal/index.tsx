import React from "react";
import GoalList from "@/components/goal/GoalList";
import Layout from "@/layouts/default";
Task.getLayout = function getLayout (page: any) {
  return (
    <Layout>{page}</Layout>
  );
};
export default function Task () {
  return (
    <GoalList />
  );
}