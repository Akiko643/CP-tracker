"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartData, ChartOptions, TooltipItem } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function getPercentage(value: number, total: number): string {
  if (total === 0) return "0";
  const percentage = ((value / total) * 100).toPrecision(3);
  return percentage;
}

export default function DoughnutCustom({
  doughnutData,
  totalProblemsNumber,
}: {
  doughnutData: number[];
  totalProblemsNumber: number;
}) {
  let data: ChartData<"doughnut"> = {
    labels: ["Solved", "Solving", "Todo", "Skipped"],
    datasets: [
      {
        label: "Problems",
        data: doughnutData,
        backgroundColor: [
          "#22c55e", // green
          "#eab308", // yellow
          "#3b82f6", // blue
          "#ef4444", // red
        ],
        hoverOffset: 4,
      },
    ],
  };
  if (totalProblemsNumber === 0) {
    data = {
      labels: ["No Problem"],
      datasets: [
        {
          label: "No problem",
          data: [1],
          backgroundColor: ["#C6C6C6"],
          hoverOffset: 4,
        },
      ],
    };
  }

  const options: ChartOptions<"doughnut"> = {
    rotation: 240,
    circumference: 240,
    cutout: "85%",
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: TooltipItem<"doughnut">) {
            const curr: number = doughnutData[tooltipItem.dataIndex];
            return getPercentage(curr, totalProblemsNumber) + "%";
          },
        },
      },
      legend: {
        display: false, // displays about the dataset on top the doughnut
      },
    },
  };
  let percentage: string = getPercentage(doughnutData[0], totalProblemsNumber);

  return (
    <div className="ml-10">
      <Doughnut className="w-52" data={data} options={options} />
      <p className="relative text-xs w-52 bottom-118px text-center">
        Completed Tasks
      </p>
      <p className="relative w-52 text-3xl bottom-120px text-center">
        {percentage}%
      </p>
    </div>
  );
}
