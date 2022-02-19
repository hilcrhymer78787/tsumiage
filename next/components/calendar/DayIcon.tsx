import { useRouter } from 'next/router'
import React from 'react';
import styles from '@/styles/calendar/DayIcon.module.scss'
import moment from "moment";
type Props = {
    day: number
}
export default function DayIcon(props: Props) {
    const router = useRouter()
    const isToday = (): boolean => {
        return (
            props.day == nowDay() &&
            year() == nowYear() &&
            month() == nowMonth()
        );
    }
    const year = (): number => {
        return Number(router.query.year);
    }
    const month = (): number => {
        return Number(router.query.month);
    }
    const nowDay = (): number => {
        return Number(moment().format("D"));
    }
    const nowYear = (): number => {
        return Number(moment().format("Y"));
    }
    const nowMonth = (): number => {
        return Number(moment().format("M"));
    }
    return (
        <div className={styles.icn}>
            <div className={isToday() ? styles.isToday + " " + styles.icn_num : styles.icn_num}>
                {props.day}
            </div>
        </div>
    )
}