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
import { apiInvitationResponseFriendType } from '@/types/api/invitation/read/response';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';

type Props = {
    friend: apiInvitationResponseFriendType
    friendRead: any
}
export default function FriendItemNow(props: Props) {
    const [value, setValue] = React.useState<number>(5);
    return (
        <Card sx={{ borderRadius: '0' }}>
            <CardHeader
                avatar={
                    <Avatar src={props.friend.user_img} />
                }
                onClick={() => { alert(); }}
                title={props.friend.name}
                subheader={props.friend.email}
            />
        </Card>
    );
}
