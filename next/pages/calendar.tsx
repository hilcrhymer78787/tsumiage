import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Layout from '../layouts/default'
import styles from '../styles/Calendar.module.scss'
import store, { setCalendars } from "../store/index"
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
        calendars: state.calendars,
    };
};
About.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}

function About({ dispatch, calendars, loginInfo }) {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    useEffect(() => {
        setCalendars()
    }, [])
    return (
        <div className='card'>
            <div className="card_header">
                <span className="card_header_ttl">カレンダー</span>
            </div>
            <div className="card_body pa-0">
                <ul className={styles.indent + " pa-0"}>
                    {week.map((day, index) => (
                        <li className={styles.indent_item} key={index.toString()}>{day}</li>
                    ))}
                </ul>
                <ul className="content">
                    {/* <li v-for="n in firstDay" :key="n" className="content_item blank"></li> */}

                    {/* <li v-for="(calendar, index) in displayCalendars" :key="calendar.date" v-ripple className="content_item main">
                    <div @click="$router.push(`/calendar?year=${year}&month=${month}&day=${index + 1}`)" className="content_item_inner">
                        <CalendarDayIcon :day="index + 1" />
                        <v-responsive className="pa-1 pie_graph" aspect-ratio="1">
                            <div v-if="calendar.minute">
                                <div className="pie_graph_cover">{{calendar.minute}}</div>
                                <PieGraphWrap mode="days" :propsDatas="calendar.users" />
                            </div>
                        </v-responsive>
                    </div>
                </li> */}

                    {/* <li v-for="n in lastDayCount" :key="n + 100" className="content_item blank"></li> */}
                </ul >
            </div >
            <pre>{JSON.stringify(calendars, null, 2)}</pre>
        </div >
    );
}

export default connect(mapStateToProps)(About);