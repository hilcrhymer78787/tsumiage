import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TaskIcon from '@mui/icons-material/Task';
import TodayIcon from '@mui/icons-material/Today';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment'
export default function Navigation() {
    const router = useRouter();
    const [value, setValue] = useState(router.pathname);
    const nowYear = (): number => {
        return Number(moment().format("Y"));
    };
    const nowMonth = (): number => {
        return Number(moment().format("M"));
    };
    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                router.push(newValue);
                setValue(newValue);
            }}
        >
            <BottomNavigationAction
                label="task"
                value="/task"
                icon={<TaskIcon />} />
            <BottomNavigationAction
                label="calendar"
                value={`/calendar?year=${nowYear()}&month=${nowMonth()}`}
                icon={<TodayIcon />} />
            <BottomNavigationAction
                label="mypage"
                value="/mypage"
                icon={<PersonIcon />} />
        </BottomNavigation>
    );
}