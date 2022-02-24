import React from "react";
import { Line } from "react-chartjs-2";
import { apiWorkReadCalendarResponseAnalyticsType } from '@/types/api/work/read/calendar/response';
import styled from "styled-components";
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
            <Wrap>
                {props.data.datasets.length &&
                    <Line
                        data={props.data}
                        options={options}
                        id="chart-key"
                    />
                }
            </Wrap>
        </>
    );
}

const Wrap = styled.div`
height: 300px;
`;

export default LinePlot;