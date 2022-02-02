import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
export default function Navigation() {
    const router = useRouter()
    const [value, setValue] = useState(router.pathname);
    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                router.push(newValue)
                setValue(newValue)
            }}
        >
            <BottomNavigationAction
                label="task"
                value="/task"
                icon={<FavoriteIcon />} />
            <BottomNavigationAction
                label="calendar"
                value="/calendar"
                icon={<RestoreIcon />} />
            <BottomNavigationAction
                label="mypage"
                value="/mypage"
                icon={<LocationOnIcon />} />
        </BottomNavigation>
    )
}