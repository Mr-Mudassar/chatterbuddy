import React from "react";
import { Line } from "react-chartjs-2";
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";

ChartJS.register(
  Title,
  Legend,
  Tooltip,
  BarElement,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

// const AutoSkip = window.innerWidth < 768 ? true : false;

const LineChart = ({ graphData }) => {
  const data = {
    labels: graphData?.map((item) => item?.month),
    datasets: [
      {
        label: "Users",
        data: graphData?.map((item) => item?.totalUsers),
        borderColor: "rgb(0, 179, 140)",
        backgroundColor: "rgb(0, 179, 140)",
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.5,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
          text: "Redemptions",
          color: "#003000",
          fontSize: "200px",
          fontWeight: "700",
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: {
            autoSkip: true,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value;
            },
          },
        },
      },
    },
  };

  return <Line data={data} options={config} />;
};

export default LineChart;
