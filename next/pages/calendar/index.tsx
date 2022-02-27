import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { connect } from "react-redux";
import moment from 'moment';
import Layout from '@/layouts/default';
import styles from '@/styles/Calendar.module.scss';
import { api } from '@/plugins/axios';
import axios from 'axios';
import { apiWorkReadCalendarResponseCalendarType } from '@/types/api/work/read/calendar/response';
import { apiWorkReadCalendarRequestType } from '@/types/api/work/read/calendar/request';
import { apiWorkReadCalendarResponseType } from '@/types/api/work/read/calendar/response';
import DayIcon from "@/components/calendar/DayIcon";
import Pagination from "@/components/calendar/Pagination";
import TaskList from '@/components/task/TaskList';
import LinePlot from '@/components/common/LinePlot';
import {
    CardActionArea,
    Dialog,
    Card,
    CardHeader,
    CardContent,
    CircularProgress,
    Box,
} from '@mui/material';
const CancelToken = axios.CancelToken;
let getCalendarDataCancel: any = null;
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

function Calendar() {
    const [calendarData, setCalendarData] = useState({
        calendars: [],
        analytics: {
            labels: [] as string[],
            datasets: {
                label: '' as string,
                data: [] as number[],
                borderColor: '' as string,
            } as any,
        }
    } as apiWorkReadCalendarResponseType);
    const [calendarLoading, setCalendarLoading] = useState(false as boolean);
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const router = useRouter();
    useEffect(() => {
        getCalendarData(year(), month());
    }, []);

    const year = (): number => {
        return Number(router.query.year);
    };
    const month = (): number => {
        return Number(router.query.month);
    };
    const day = (): number => {
        return Number(router.query.day);
    };
    const lastDay = (): number => {
        return new Date(Number(year()), Number(month()), 0).getDate();
    };
    const firstDay = (): number => {
        return new Date(
            Number(year()),
            Number(month()) - 1,
            1
        ).getDay();
    };
    const lastDayCount = (): number => {
        return (
            6 -
            new Date(
                Number(year()),
                Number(month()) - 1,
                Number(lastDay())
            ).getDay()
        );
    };
    const getCalendarData = async (year: number, month: number) => {
        if (getCalendarDataCancel) {
            getCalendarDataCancel();
        }
        const apiParam: apiWorkReadCalendarRequestType = {
            year: year,
            month: month
        };
        const requestConfig: AxiosRequestConfig = {
            url: `/api/work/read/calendar`,
            method: "GET",
            params: apiParam,
            cancelToken: new CancelToken(c => {
                getCalendarDataCancel = c;
            }),
        };
        setCalendarLoading(true);
        await api(requestConfig)
            .then((res: AxiosResponse<apiWorkReadCalendarResponseType>) => {
                setCalendarData(res.data);
            })
            .finally(() => {
                setCalendarLoading(false);
            });
    };

    return (
        <>
            <Card sx={{ mb: '20px' }}>
                <CardHeader
                    title={
                        <Pagination setCalendarData={(date: { year: number, month: number }) => {
                            getCalendarData(date.year, date.month);
                        }} />
                    }
                />
                <CardContent sx={{ p: '0 !important' }}>
                    <ul className={styles.indent}>
                        {week.map((day, index) => (
                            <li className={styles.indent_item} key={index.toString()}>{day}</li>
                        ))}
                    </ul>
                    {calendarLoading && !Boolean(calendarData.calendars.length) &&
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            p: '30px'
                        }}>
                            <CircularProgress />
                        </Box>
                    }
                    <ul className={styles.content}>
                        {[...Array(firstDay())].map((n, index) => (
                            <li key={index.toString()} className={styles.content_item + ' ' + styles.blank}></li>
                        ))}
                        {calendarData.calendars.map((calendar: apiWorkReadCalendarResponseCalendarType, index: number) => (
                            <li key={calendar.date} className={styles.content_item + ' main'}>
                                <CardActionArea
                                    onClick={() => {
                                        Router.push(`/calendar?year=${Router.router.query.year}&month=${Router.router.query.month}&day=${index + 1}`);
                                    }}
                                    className={styles.content_item_inner}
                                >
                                    <DayIcon day={index + 1} />
                                    <div className={styles.content_item_inner_main}>
                                        {Boolean(calendar.minute) ? `${calendar.minute}分` : ''}
                                    </div>
                                </CardActionArea>
                            </li>
                        ))}
                        {[...Array(lastDayCount())].map((n, index) => (
                            <li key={index.toString()} className={styles.content_item + ' ' + styles.blank}></li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {Boolean(calendarData.analytics.datasets.length) &&
                <Card>
                    <CardHeader title="データ" />
                    <CardContent>
                        <LinePlot height="300px" data={calendarData.analytics} />
                    </CardContent>
                </Card>
            }

            <Dialog
                open={Boolean(router.query.day)}
                onClose={() => {
                    getCalendarData(year(), month());
                    Router.push(`/calendar?year=${year()}&month=${month()}`);
                }}>
                {Boolean(router.query.day) &&
                    <TaskList date={moment(`${year()}/${month()}/${day()}`).format("YYYY-MM-DD")} />
                }
            </Dialog>
        </>
    );
}

export default connect(mapStateToProps)(Calendar);