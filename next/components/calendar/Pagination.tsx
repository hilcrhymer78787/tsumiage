import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/calendar/Pagination.module.scss';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { CardActionArea, IconButton, Dialog, ListItem, ListItemAvatar, ListItemText, Avatar, CircularProgress } from '@material-ui/core';
import store, { setCalendars } from "@/store/index";
import moment from "moment";
export default function Pagination() {
    const router = useRouter();
    const year = (): number => {
        return Number(router.query.year);
    };
    const month = (): number => {
        return Number(router.query.month);
    };
    const nowDay = (): number => {
        return Number(moment().format("D"));
    };
    const nowYear = (): number => {
        return Number(moment().format("Y"));
    };
    const nowMonth = (): number => {
        return Number(moment().format("M"));
    };
    const onClickPrevMonth = () => {
        if (month() == 1) {
            router.push(`/calendar?year=${year() - 1}&month=12`);
            setCalendars(year() - 1, 12);
        } else {
            router.push(`/calendar?year=${year()}&month=${month() - 1}`);
            setCalendars(year(), month() - 1);
        }
    };
    const onClickNextMonth = () => {
        if (month() == 12) {
            router.push(`/calendar?year=${year() + 1}&month=1`);
            setCalendars(year() + 1, 1);
        } else {
            router.push(`/calendar?year=${year()}&month=${month() + 1}`);
            setCalendars(year(), month() + 1);
        }
    };
    return (
        <div className={styles.Pagination}>
            <NavigateBeforeIcon className={styles.icon} onClick={onClickPrevMonth} />
            <h1>{year()}年 {month()}月</h1>
            <NavigateNextIcon className={styles.icon} onClick={onClickNextMonth} />
        </div>
    );
}