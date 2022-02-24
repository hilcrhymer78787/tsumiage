import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinePlot from '@/components/common/LinePlot';
import SimpleTable from '@/components/common/SimpleTable';
import moment from 'moment';
import { apiGoalReadResponseGoalsType } from '@/types/api/goal/read/response';
type Props = {
    goal: apiGoalReadResponseGoalsType
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function GoalItem(props: Props) {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <>
            <Card
                sx={{
                    m: expanded ? '20px' : '0',
                    borderRadius: expanded ? '4px' : '0'
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            sx={{
                                fontSize: '13px',
                                bgcolor: props.goal.sum_minute >= props.goal.minute ? '#1976d2' : ''
                            }}
                        >{Math.floor(props.goal.sum_minute * 100 / props.goal.minute)}%</Avatar>
                    }
                    action={
                        <IconButton>
                            <ExpandMore
                                sx={{ color: '1976d2' }}
                                expand={expanded}
                                aria-expanded={expanded}
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </IconButton>
                    }
                    onClick={() => { setExpanded(!expanded); }}
                    title={`${props.goal.task_name}（目標:${props.goal.minute}分）`}
                    subheader={`実績:${props.goal.sum_minute}分、期限:残り${props.goal.deadline_day_count}日`}
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <LinePlot data={props.goal.analytics} />
                        <SimpleTable datas={[
                            { key: 'ペース', value: `あと${props.goal.deadline_day_count}日で${props.goal.minute - props.goal.sum_minute}分` },
                            { key: '開始日', value: moment(props.goal.start_date).format('Y年M月D日') },
                            { key: '期限日', value: moment(props.goal.end_date).format('Y年M月D日') },
                        ]} />
                    </CardContent>
                    <CardActions disableSpacing>
                        <div></div>
                        <Button
                            color="primary"
                            variant="contained"
                        // onClick={taskCreate}
                        // endIcon={taskCreateLoading ? <CircularProgress size={25} /> : <SendIcon />}
                        // disabled={taskCreateLoading || taskDeleteLoading}
                        >編集</Button>
                    </CardActions>
                </Collapse>
            </Card>
        </>
    );
}
