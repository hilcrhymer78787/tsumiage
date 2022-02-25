import React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { analyticsType } from '@/types/common/analyticsType';
import { Dialog, Select, FormControl, MenuItem, InputLabel, Box } from '@mui/material';
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
import { AddBoxSharp } from "@mui/icons-material";
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
    data: analyticsType
    height: string
}
function LinePlot(props: Props) {

    const options: {} = {
        maintainAspectRatio: false,
    };

    return (
        <>
            <Box sx={{ height: props.height }}>
                {props.data.datasets.length &&
                    <Line
                        data={props.data}
                        options={options}
                        id="chart-key"
                    />
                }
            </Box>
        </>
    );
}

export default LinePlot;