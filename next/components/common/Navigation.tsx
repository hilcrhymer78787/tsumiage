import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TaskIcon from '@mui/icons-material/Task';
import TodayIcon from '@mui/icons-material/Today';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import moment from 'moment';
import GroupIcon from '@mui/icons-material/Group';
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
                label="goal"
                value="/goal"
                icon={<SportsScoreIcon />} />
            <BottomNavigationAction
                label="friend"
                value="/friend"
                icon={<GroupIcon />} />
        </BottomNavigation>
    );
}