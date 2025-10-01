import React from "react";
import Loader from "@/Assets/loader.gif";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SubscriptionChart({ graphData }) {
  if (!graphData || graphData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img alt="loader" src={Loader} className="w-20 h-20" />
      </div>
    );
  }

  const data = {
    labels: graphData.map((d) => d.group),
    datasets: [
      {
        data: graphData.map((d) => d.percentage),
        backgroundColor: ["#FFD700", "#6B4226"],
        borderWidth: 6,
        borderRadius: 10, // 👈 makes the arc edges rounded
      },
    ],
  };

  const options = {
    cutout: "92%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    afterDraw: (chart) => {
      if (!graphData || graphData.length === 0) return;

      const { width, height, ctx } = chart;
      ctx.save();

      const percentage = `${graphData[0]?.percentage?.toFixed(0)}%`;
      const label = graphData[0]?.group ?? "";

      // Label above percentage
      ctx.font = "10px sans-serif";
      ctx.fillStyle = "#555";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, width / 2, height / 2 - 40);

      // Percentage in center
      ctx.font = "bold 36px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText(percentage, width / 2, height / 2);

      ctx.restore();
    },
  };

  return (
    <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
  );
}
