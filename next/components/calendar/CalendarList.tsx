import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import dayjs from "dayjs";
import axios from "axios";
import { apiWorkReadCalendarResponseCalendarType } from "@/types/api/work/read/calendar/response";
import { apiWorkReadCalendarResponseType } from "@/types/api/work/read/calendar/response";
import DayIcon from "@/components/calendar/DayIcon";
import Pagination from "@/components/calendar/Pagination";
import TaskList from "@/components/task/TaskList";
import LinePlot from "@/components/common/LinePlot";
import styled from "styled-components";
import { useTheme } from '@mui/material/styles';
import {
  CardActionArea,
  Dialog,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";
import { useWorkApi } from "@/data/work";
type Props = {
  userId: number,
  readonly: boolean,
}
export default function CalendarList(props: Props) {
  const theme = useTheme();
  const { workReadCalendar, workReadCalendarLoading, } = useWorkApi();
  const [calendarData, setCalendarData] = useState<apiWorkReadCalendarResponseType>({
    calendars: [],
    analytics: {
      labels: [],
      datasets: [],
    }
  });
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
  const firstDay = (): number => {
    return dayjs(`${year()}/${month()}/1`, "YYYY-MM-DD").day();
  };
  const lastDayCount = (): number => {
    return 6 - dayjs(`${year()}/${month()}/1`, "YYYY-MM-DD").endOf("month").day();
  };
  const getCalendarData = async (year: number, month: number) => {
    try {
      const res = await workReadCalendar({
        user_id: props.userId,
        year: year,
        month: month
      });
      setCalendarData(res.data);
    } catch (e) {
      if (axios.isCancel(e)) return;
      if (axios.isAxiosError(e)) {
        alert(`${e?.response?.status}：${e?.response?.statusText}`);
      } else {
        alert("予期せぬエラー");
      }
    }
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
          {workReadCalendarLoading && !calendarData.calendars.length && (
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              p: "30px"
            }}>
              <CircularProgress />
            </Box>
          )}
          <Content>
            {[...Array(firstDay())].map((n, index) => (
              <ContentItem key={index.toString()} className="blank"></ContentItem>
            ))}
            {calendarData.calendars.map((calendar: apiWorkReadCalendarResponseCalendarType, index: number) => (
              <ContentItem key={calendar.date} className="main">
                <CardActionArea
                  onClick={() => {
                    Router.push(`${location.pathname}?year=${Router.router?.query.year}&month=${Router.router?.query.month}&day=${index + 1}`);
                  }}
                  sx={{ minHeight: "40px" }}
                >
                  <DayIcon day={index + 1} />
                  <ContentItemText style={{ color: theme.palette.primary.main }}>
                    {!!calendar.minute ? `${calendar.minute}分` : ""}
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

      {!!calendarData.analytics.datasets.length && (
        <Card>
          <CardHeader title="データ" />
          <CardContent>
            <LinePlot height="300px" data={calendarData.analytics} />
          </CardContent>
        </Card>
      )}

      <Dialog
        open={!!router.query.day}
        onClose={() => {
          getCalendarData(year(), month());
          Router.push(`${location.pathname}?year=${year()}&month=${month()}`);
        }}>
        {!!router.query.day && (
          <TaskList
            readonly={props.readonly}
            userId={props.userId}
            date={dayjs(`${year()}/${month()}/${day()}`).format("YYYY-MM-DD")}
          />
        )}
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
    background-color: #62b1ff55;
}
`;
const ContentItemText = styled.div`
text-align: center;
font-size: 13px;
padding: 5px 2px;
min-height: 25px;
`;