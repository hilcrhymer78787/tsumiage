import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import TaskList from '@/components/task/TaskList';
import Layout from '@/layouts/default';
import moment from 'moment';
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
    };
};
Task.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    );
};
function Task({ loginInfo }) {
    return (
        <TaskList
            date={moment().format("YYYY-MM-DD")}
            userId={loginInfo.id}
            readonly={false}
        />
    );
}
export default connect(mapStateToProps)(Task);