import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { apiTaskReadResponseTaskType } from '../../types/api/task/read/response'
type Props = {
    focusTask: apiTaskReadResponseTaskType
    onCloseMyself: any
}
export default function CreateTask(props: Props) {
    return (
        <div className='card'>
            <div className="card_header">
                <span className="card_header_ttl">{props.focusTask.name}</span>
            </div>

            <CardContent>
                <pre>{JSON.stringify(props.focusTask, null, 2)}</pre>
            </CardContent>
            <div className="card_footer">
                <Button onClick={props.onCloseMyself} variant="contained">close</Button>
            </div>
        </div>
    )
}