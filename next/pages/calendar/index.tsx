import React from "react";
import { connect } from "react-redux";
import Layout from "@/layouts/default";
import { stateType } from "@/types/common/stateType";
import CalendarList from "@/components/calendar/CalendarList";
const mapStateToProps = (state: stateType) => state;
function Calendar(state: stateType) {
  return (
    <Layout>
      <CalendarList readonly={false} userId={state.loginInfo ? state.loginInfo.id : 0} />
    </Layout>
  );
}
export default connect(mapStateToProps)(Calendar);