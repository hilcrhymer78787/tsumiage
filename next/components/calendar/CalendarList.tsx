import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import moment from "moment";
import { api } from "@/plugins/axios";
import axios from "axios";
import { apiWorkReadCalendarResponseCalendarType } from "@/types/api/work/read/calendar/response";
import { apiWorkReadCalendarRequestType } from "@/types/api/work/read/calendar/request";
import { apiWorkReadCalendarResponseType } from "@/types/api/work/read/calendar/response";
import DayIcon from "@/components/calendar/DayIcon";
import Pagination from "@/components/calendar/Pagination";
import TaskList from "@/components/task/TaskList";
import LinePlot from "@/components/common/LinePlot";
import styled from "styled-components";
import {
    CardActionArea,
    Dialog,
    Card,
    CardHeader,
    CardContent,
    CircularProgress,
    Box,
} from "@mui/material";
const CancelToken = axios.CancelToken;
let getCalendarDataCancel: any = null;
type Props = {
    userId: number,
    readonly: boolean,
}
export default function CalendarList (props: Props) {
    const [calendarData, setCalendarData] = useState({
        calendars: [],
        analytics: {
            labels: [] as string[],
            datasets: {
                label: "" as string,
                data: [] as number[],
                borderColor: "" as string,
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
            user_id: props.userId,
            year: year,
            month: month
        };
        const requestConfig: AxiosRequestConfig = {
            url: "/api/work/read/calendar",
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
            <Card sx={{ mb: "20px" }}>
                <CardHeader
                    title={
                        <Pagination setCalendarData={(date: { year: number, month: number }) => {
                            getCalendarData(date.year, date.month);
                        }} />
                    }
                />
                <CardContent sx={{ p: "0 !important" }}>
                    <Indent >
                        {week.map((day, index) => (
                            <IndentItem key={index.toString()}>{day}</IndentItem>
                        ))}
                    </Indent>
                    {calendarLoading && !Boolean(calendarData.calendars.length) &&
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: "30px"
                        }}>
                            <CircularProgress />
                        </Box>
                    }
                    <Content>
                        {[...Array(firstDay())].map((n, index) => (
                            <ContentItem key={index.toString()} className="blank"></ContentItem>
                        ))}
                        {calendarData.calendars.map((calendar: apiWorkReadCalendarResponseCalendarType, index: number) => (
                            <ContentItem key={calendar.date} className="main">
                                <CardActionArea
                                    onClick={() => {
                                        Router.push(`${location.pathname}?year=${Router.router.query.year}&month=${Router.router.query.month}&day=${index + 1}`);
                                    }}
                                    sx={{ minHeight: "40px" }}
                                >
                                    <DayIcon day={index + 1} />
                                    <ContentItemText>
                                        {Boolean(calendar.minute) ? `${calendar.minute}分` : ""}
                                    </ContentItemText>
                                </CardActionArea>
                            </ContentItem>
                        ))}
                        {[...Array(lastDayCount())].map((n, index) => (
                            <ContentItem key={index.toString()} className="blank"></ContentItem>
                        ))}
                    </Content>
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
                    Router.push(`${location.pathname}?year=${year()}&month=${month()}`);
                }}>
                {Boolean(router.query.day) &&
                    <TaskList
                        readonly={props.readonly}
                        userId={props.userId}
                        date={moment(`${year()}/${month()}/${day()}`).format("YYYY-MM-DD")}
                    />
                }
            </Dialog>
        </>
    );
}
const Indent = styled.div`
display: flex;
padding: 0;
`;
const IndentItem = styled.div`
width: calc(100% / 7);
text-align: center;
padding: 5px 0;
&:nth-child(1) {
    color: #ff5252;
}
&:nth-child(7) {
    color: #2196f3;
}
`;
const Content = styled.div`
display: flex;
flex-wrap: wrap;
padding: 0;
background-color: white;
`;
const ContentItem = styled.div`
width: calc(100% / 7);
border-right: 1px solid #e0e0e0;
border-top: 1px solid #e0e0e0;
overflow: hidden;
&:nth-child(7n) {
    border-right: none;
}
&:nth-child(7n) .content_item_icn {
    color: #2196f3;
}
&:nth-child(7n-6) .content_item_icn {
    color: #ff5252;
}
&.blank {
    background-color: #f7f7f7;
}
&.main:hover {
    cursor: pointer;
    background-color: #00968734;
}
`;
const ContentItemText = styled.div`
text-align: center;
font-size: 13px;
padding: 5px 2px;
color: #1976d2b4;
min-height: 25px;
`;