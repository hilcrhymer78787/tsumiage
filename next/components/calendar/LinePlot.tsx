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
    let graphData = {
        labels: props.data.labels,
        datasets: [
            {
                label: "A社",
                data: [65, 59, 60, 81, 56, 55],
                borderColor: "rgb(75, 192, 192)",
            },
            {
                label: "B社",
                data: [60, 55, 57, 61, 75, 50],
                borderColor: "rgb(75, 100, 192)",
            },
        ],
    };

    const options: {} = {
        maintainAspectRatio: false,
    };

    return (
        <Line
            height={300}
            data={graphData}
            options={options}
            id="chart-key"
        />
    );
}

export default LinePlot;