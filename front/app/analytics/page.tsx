"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAnalyticsTimeBar } from "@/api";
import { BarDayElement } from "@/types/types";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function dateToString(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return day + "/" + month + "/" + year;
}

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const daysOfTheWeek = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];

  const timespans = ["week", "month", "year", "all"];
  const [indexTimeBar, setIndexTimeBar] = useState<number>(0);

  // Bar data
  const [barData, setBarData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [
      {
        data: [10, 15, 20, 1],
        borderColor: "#36A2EB",
        backgroundColor: "#9BD0F5",
      },
    ],
  });

  const [barOptions, setBarOptions] = useState<ChartOptions<"bar">>({
    responsive: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return [""];
          },
        },
      },
    },
  });

  let durations: number[] = [];
  let numOfProblems: number[] = [];
  let labels: string[] = [];
  let dates: string[] = [];

  function updateBarChart() {
    // setting bar data
    setBarData({
      ...barData,
      labels: labels,
      datasets: [
        {
          label: "Total solving duration",
          data: durations,
          borderColor: "#36A2EB",
          backgroundColor: "#9BD0F5",
        },
      ],
    });
    // setting bar options
    setBarOptions({
      ...barOptions,
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context) {
              return [
                durations[context.dataIndex].toString(),
                "Solved Problems: " + numOfProblems[context.dataIndex],
                "Date: " + dates[context.dataIndex].toString(),
              ];
            },
          },
        },
      },
    });
  }

  // update bar data
  useEffect(() => {
    async function fetchData() {
      try {
        const res: BarDayElement[] = await getAnalyticsTimeBar(
          timespans[indexTimeBar]
        );
        if (indexTimeBar === 0 || indexTimeBar === 1) {
          // week / month
          durations = res.map((element) => element.totalDurationMins);
          numOfProblems = res.map((element) => element.numOfProblems);
          if (indexTimeBar === 1) labels = [];
          else
            labels = res.map(
              (element) => daysOfTheWeek[element.date.dayOfTheWeek]
            );
          dates = res.map(
            (element) =>
              element.date.year +
              "/" +
              element.date.month +
              "/" +
              element.date.day
          );
          updateBarChart();
        } else if (indexTimeBar === 2) {
          // year
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [indexTimeBar]);

  // initial loading
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get("timespan")) {
      const timespan = params.get("timespan")!;
      const index = timespans.indexOf(timespan);
      setIndexTimeBar(index);
    }
  }, []);

  function setParam({ field, value }: { field: string; value: string }) {
    const params = new URLSearchParams(searchParams);
    if (value === "") {
      params.delete(field);
    } else {
      params.set(field, value);
    }
    replace(pathname + "?" + params.toString());
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="border rounded-full w-60">
          <button
            onClick={() => {
              setIndexTimeBar(0);
              setParam({ field: "timespan", value: "" });
            }}
            className={`${
              indexTimeBar === 0
                ? "ring-1 rounded-full ring-inset bg-blue-300"
                : "text-text-50"
            } py-1 w-1/3`}
          >
            week
          </button>
          <button
            onClick={() => {
              setIndexTimeBar(1);
              setParam({ field: "timespan", value: "month" });
            }}
            className={`${
              indexTimeBar === 1
                ? "ring-1 rounded-full ring-inset bg-blue-300"
                : "text-text-50"
            } py-1 w-1/3`}
          >
            month
          </button>
          <button
            onClick={() => {
              setIndexTimeBar(2);
              setParam({ field: "timespan", value: "year" });
            }}
            className={`${
              indexTimeBar === 2
                ? "ring-1 rounded-full ring-inset bg-blue-300"
                : "text-text-50"
            } py-1 w-1/3`}
          >
            year
          </button>
        </div>
        <Bar height={300} options={barOptions} data={barData} />
      </div>
    </div>
  );
}
