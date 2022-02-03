import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
export default function HotelDetail(props) {
    return (
        <Card>
            <CardActionArea>
                <CardMedia component="img" height="140" image={props.focusHotel.hotelImageUrl} />
                <CardContent>
                    <Typography variant="h5">{props.focusHotel.hotelName}</Typography>
                    <Typography>{props.focusHotel.hotelSpecial}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={props.onCloseMyself} variant="contained">close</Button>
            </CardActions>
        </Card>
    )
}