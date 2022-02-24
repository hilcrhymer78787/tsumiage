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
import LinePlot from '@/components/calendar/LinePlot';
type Props = {
    goal: any
}
const dummyData = {
    labels: ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月"],
    datasets: [
        {
            label: "目標",
            data: [100, 100, 100, 100, 100, 100],
            borderColor: "rgb(75, 192, 192)",
        },
        {
            label: "B社",
            data: [60, 55, 57, 61, 75, 50],
            borderColor: "rgb(75, 100, 192)",
        },
    ],
};

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
        <Card
            sx={{
                m: expanded ? '20px' : '0',
                borderRadius: expanded ? '4px' : '0'
            }}
        >
            <CardHeader
                avatar={
                    <Avatar>{Math.floor(props.goal.sum_minute * 100 / props.goal.minute)}%</Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <ExpandMore
                            sx={{ color: '1976d2' }}
                            expand={expanded}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </IconButton>
                }
                onClick={() => { setExpanded(!expanded); }}
                title={`${props.goal.task_name}（${props.goal.minute}分）`}
                subheader={`実績:${props.goal.sum_minute}分、期限:残り○日`}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <LinePlot data={dummyData} />
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
    );
}
