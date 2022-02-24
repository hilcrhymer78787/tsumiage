import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export default function ResponsiveDatePickers() {
    const [value, setValue] = React.useState<Date | null>(new Date());

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
                label="For mobile"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
                label="For desktop"
                value={value}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
                disableFuture
                label="Responsive"
                openTo="year"
                views={['year', 'month', 'day']}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}