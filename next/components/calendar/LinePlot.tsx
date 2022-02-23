import React from "react";
import { Line } from "react-chartjs-2";
import { apiWorkReadCalendarResponseAnalyticsType } from '@/types/api/work/read/calendar/response'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
type Props = {
    data: apiWorkReadCalendarResponseAnalyticsType
}
function LinePlot(props: Props) {

    const options: {} = {
        maintainAspectRatio: false,
    };

    return (
        <>
            {props.data.datasets.length &&
                <Line
                    height={300}
                    data={props.data}
                    options={options}
                    id="chart-key"
                />
            }
        </>
    );
}

export default LinePlot;