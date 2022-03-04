import { useRouter } from "next/router";
import React from "react";
import moment from "moment";
import styled from "styled-components";
type Props = {
    day: number
}
export default function DayIcon (props: Props) {
    const router = useRouter();
    const isToday = (): boolean => {
        return (
            props.day == nowDay() &&
            year() == nowYear() &&
            month() == nowMonth()
        );
    };
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
    return (
        <Icn>
            <IcnNum className={isToday() ? "icn_num isToday" : "icn_num"}>
                {props.day}
            </IcnNum>
        </Icn>
    );
}
const Icn = styled.div`
padding-top: 5px;
display: flex;
justify-content: center;
align-items: center;
`;
const IcnNum = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 20px;
height: 20px;
font-size: 14px;
border-radius: 50%;
&.isToday {
    background-color: #1976d2;
    color: white;
    font-size: 12px;
}
`;