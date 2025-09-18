import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SubscriptionChart() {
  const data = {
    labels: ["Other Packages", "Enterprise Package"],
    datasets: [
      {
        data: [81, 19], // percentages
        backgroundColor: ["#FFD700", "#6B4226"], // yellow, brown
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%", // makes it look like a ring
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

  // Custom plugin to draw center text
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      ctx.restore();

      const fontSize = (height / 100).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";

      const text = "81%";
      const subText = "Other packages";
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2 - 10;

      ctx.fillStyle = "#000";
      ctx.fillText(text, textX, textY);

      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#555";
      ctx.fillText(
        subText,
        (width - ctx.measureText(subText).width) / 2,
        textY + 25
      );

      ctx.save();
    },
  };

  return (
    <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
  );
}
