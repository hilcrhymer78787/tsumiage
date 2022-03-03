import { useRouter } from 'next/router';
import React from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import styled from "styled-components";
type Props = {
    setCalendarData: any
}
export default function Pagination(props: Props) {
    const router = useRouter();
    const year = (): number => {
        return Number(router.query.year);
    };
    const month = (): number => {
        return Number(router.query.month);
    };
    const onClickPrevMonth = () => {
        if (month() == 1) {
            router.push(`${location.pathname}?year=${year() - 1}&month=12`);
            props.setCalendarData({ year: year() - 1, month: 12 });
        } else {
            router.push(`${location.pathname}?year=${year()}&month=${month() - 1}`);
            props.setCalendarData({ year: year(), month: month() - 1 });
        };
    };
    const onClickNextMonth = () => {
        if (month() == 12) {
            router.push(`${location.pathname}?year=${year() + 1}&month=1`);
            props.setCalendarData({ year: year() + 1, month: 1 });
        } else {
            router.push(`${location.pathname}?year=${year()}&month=${month() + 1}`);
            props.setCalendarData({ year: year(), month: month() + 1 });
        }
    };
    return (
        <PaginationDiv>
            <StyledNavigateBeforeIcon onClick={onClickPrevMonth} />
            <H1>{year()}年 {month()}月</H1>
            <StyledNavigateNextIcon onClick={onClickNextMonth} />
        </PaginationDiv>
    );
};
const H1 = styled.h1`
font-size: 25px;
width: 183px;
text-align: center;
margin: 0;
`;
const PaginationDiv = styled.div`
width: 100%;
font-size: 15px;
display: flex;
justify-content: center;
align-items:center;
`;
const StyledNavigateBeforeIcon = styled(NavigateBeforeIcon)`
color: white;
font-size: 30px;
`;
const StyledNavigateNextIcon = styled(NavigateNextIcon)`
color: white;
font-size: 30px;
`;