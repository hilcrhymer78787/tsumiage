import React from "react";
import { Line } from "react-chartjs-2";
import { analyticsType } from "@/types/common/analyticsType";
import { Box } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
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
function LinePlot (props: Props) {

    const options: {} = {
        maintainAspectRatio: false,
    };

    return (
        <Box sx={{ height: props.height }}>
            {Boolean(props.data.datasets.length) &&
                <Line
                    data={props.data}
                    options={options}
                    id="chart-key"
                />
            }
        </Box>
    );
}

export default LinePlot;