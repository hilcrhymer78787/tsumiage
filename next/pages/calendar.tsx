import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Layout from '../layouts/default'
import styles from '../styles/Calendar.module.scss'
import store, { setCalendars } from "../store/index"
import DayIcon from "../components/calendar/DayIcon"
import Router from 'next/router';
import Pagination from "../components/calendar/Pagination"
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
    const router = useRouter()
    useEffect(() => {
        setCalendars()
    }, [])

    const year = (): number => {
        return Number(router.query.year);
    }
    const month = (): number => {
        return Number(router.query.month);
    }
    const day = (): number => {
        return Number(router.query.day);
    }
    const lastDay = (): number => {
        return new Date(Number(year()), Number(month()), 0).getDate();
    }
    const firstDay = (): number => {
        return new Date(
            Number(year()),
            Number(month()) - 1,
            1
        ).getDay();
    }
    const lastDayCount = (): number => {
        return (
            6 -
            new Date(
                Number(year()),
                Number(month()) - 1,
                Number(lastDay())
            ).getDay()
        );
    }

    return (
        <div className='card'>
            <div className="card_header">
                <Pagination />
            </div>
            <div className="card_body pa-0">
                <ul className={styles.indent + " pa-0"}>
                    {week.map((day, index) => (
                        <li className={styles.indent_item} key={index.toString()}>{day}</li>
                    ))}
                </ul>
                <ul className={styles.content}>
                    {[...Array(firstDay())].map((n, index) => (
                        <li key={index.toString()} className={styles.content_item + ' ' + styles.blank}></li>
                    ))}
                    {calendars.map((calendar, index) => (
                        <li key={calendar.date} className={styles.content_item + ' main'}>
                            <div onClick={() => {
                                Router.push(`/calendar?year=${Router.router.query.year}&month=${Router.router.query.month}&day=${index + 1}`)
                            }} className={styles.content_item_inner}>
                                <DayIcon day={index + 1} />
                                <div>{calendar.minute}</div>
                            </div>
                        </li>
                    ))}
                    {[...Array(lastDayCount())].map((n, index) => (
                        <li key={index.toString()} className={styles.content_item + ' ' + styles.blank}></li>
                    ))}
                </ul >
            </div >
        </div >
    );
}

export default connect(mapStateToProps)(About);