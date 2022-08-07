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
  Filler,
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
  TimeScale,
  Filler
);

export function LineChart(props) {
  let chartLineColor = "";
  let chartFillColor = "";
  if (props.isGain) {
    chartLineColor = "rgba(8, 161, 8, .8)";
    chartFillColor = "rgba(8, 161, 8, .3)";
  } else {
    chartLineColor = "rgba(225, 84, 84, .8)";
    chartFillColor = "rgba(225, 84, 84, .3)";
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
        radius: 0,
        fill: true,
        backgroundColor: chartFillColor,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
