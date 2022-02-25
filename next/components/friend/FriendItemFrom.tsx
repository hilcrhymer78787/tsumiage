import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { api } from '@/plugins/axios';
import { apiGoalReadResponseType } from '@/types/api/goal/read/response';
import { apiGoalReadResponseGoalsType } from '@/types/api/goal/read/response';
import { apiGoalCreateRequestType } from '@/types/api/goal/create/request';
import { apiGoalDeleteRequestType } from '@/types/api/goal/delete/request';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, CircularProgress } from '@mui/material';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import TextField from '@mui/material/TextField';
import { CardActionArea, IconButton, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { Dialog, Select, FormControl, MenuItem, InputLabel, Box } from '@mui/material';
import { MINUTE } from '@/static/const';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import moment from 'moment';
import { apiTaskReadRequestType } from '@/types/api/task/read/request';
import { apiTaskReadResponseType } from '@/types/api/task/read/response';
import { apiTaskReadResponseTaskType } from '@/types/api/task/read/response';
import { apiFriendReadResponseFriendType } from '@/types/api/friend/read/response';

type Props = {
    friend: apiFriendReadResponseFriendType
}
export default function FriendItemFrom(props: Props) {
    const [value, setValue] = React.useState<number>(5);
    return (
        <>
            <pre>{JSON.stringify(props.friend, null, 2)}</pre>
        </>
    );
}
