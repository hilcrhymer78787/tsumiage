import React from 'react';
import { connect } from "react-redux";
import Layout from '@/layouts/default';
import CalendarList from '@/components/calendar/CalendarList';
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
    };
};
Calendar.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    );
};
function Calendar({loginInfo}) {

    return (
        <CalendarList userId={loginInfo.id}/>
    );
}
export default connect(mapStateToProps)(Calendar);