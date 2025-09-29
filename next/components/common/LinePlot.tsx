import { Line } from "react-chartjs-2";

import { Box } from "@mui/material";
export interface analyticsType {
  labels: string[];
  datasets: analyticsDatasetType[];
}
export interface analyticsDatasetType {
  label: string;
  borderColor: string;
  data: string[];
}
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const LinePlot = ({ data, height }: { data: analyticsType; height: string }) => {
  const options: {} = {
    maintainAspectRatio: false,
  };

  return (
    <Box sx={{ height: height }}>
      {!!data.datasets.length && <Line data={data} options={options} id="chart-key" />}
    </Box>
  );
};

export default LinePlot;
