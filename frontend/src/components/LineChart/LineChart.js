import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./LineChart.css";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export function LineChart(props) {
  let chartLineColor = "";
  if (props.isGain) {
    chartLineColor = "rgb(8, 161, 8, .8)";
  } else {
    chartLineColor = "rgba(225, 84, 84, .8)";
  }
  const options = {
    scales: {
      x: {
        type: "time",
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: "Price History",
      },
    },
  };
  const data = {
    datasets: [
      {
        type: "line",
        data: props.data.map((priceData) => ({
          x: priceData.date,
          y: priceData.priceUsd,
        })),
        borderColor: chartLineColor,
        backgroundColor: "rgba(132, 99, 255, 0.5)",
        radius: 0,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
