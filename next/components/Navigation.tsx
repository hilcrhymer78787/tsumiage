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
                label="index"
                value="/"
                icon={<LocationOnIcon />} />
            <BottomNavigationAction
                label="about"
                value="/about"
                icon={<RestoreIcon />} />
            <BottomNavigationAction
                label="task"
                value="/task"
                icon={<FavoriteIcon />} />
        </BottomNavigation>
    )
}