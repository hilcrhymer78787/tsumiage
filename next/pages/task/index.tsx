import React from "react";
import { connect } from "react-redux";
import TaskList from "@/components/task/TaskList";
import Layout from "@/layouts/default";
import moment from "moment";
import { stateType } from "@/types/common/stateType";
const mapStateToProps = (state: stateType) => state;
function Task(state: stateType) {
  return (
    <Layout>
      <TaskList
        date={moment().format("YYYY-MM-DD")}
        userId={state.loginInfo ? state.loginInfo.id : 0}
        readonly={false}
      />
    </Layout>
  );
}
export default connect(mapStateToProps)(Task);