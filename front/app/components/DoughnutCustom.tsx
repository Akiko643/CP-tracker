"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutCustom({
  doughnutData,
  totalProblemsNumber,
}: {
  doughnutData: number[];
  totalProblemsNumber: number;
}) {
  const data = {
    labels: ["Solved", "Skipped", "Solving", "Todo"],
    datasets: [
      {
        label: "Problems",
        data: doughnutData,
        backgroundColor: [
          "#22c55e", // green
          "#ef4444", // red
          "#eab308", // yellow
          "#3b82f6", // blue
        ],
        hoverOffset: 4,
      },
    ],
  };
  // TODO: display empty doughnut
  return (
    <div className="ml-10">
      <Doughnut className="w-52" data={data} />
    </div>
  );
}
