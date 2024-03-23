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

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const daysOfTheWeek = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
  const months = [
    "NOT",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const fullMonths = [
    "NOT",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const timespans = ["week", "month", "year", "all"];
  const [indexTimeBar, setIndexTimeBar] = useState<number>(0);
  // is initial fetch for the bar data returned
  const [barFetced, setBarFetched] = useState<boolean>(false);

  const [barData, setBarData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: "sky-300",
        backgroundColor: "#9BD0F5",
      },
    ],
  });
  const [barOptions, setBarOptions] = useState<ChartOptions<"bar">>({
    responsive: false,
  });

  let durations: number[] = [];
  let numOfProblems: number[] = [];
  let labels: string[] = [];
  let dates: string[] = [];

  function updateBarChart(isX: boolean) {
    // setting bar data
    setBarData({
      labels: labels,
      datasets: [
        {
          label: "Total solving duration (minutes)",
          data: durations,
          borderColor: "sky-300",
          backgroundColor: "#9BD0F5",
        },
      ],
    });
    // setting bar options
    setBarOptions({
      responsive: false,
      scales: {
        x: {
          display: isX,
        },
      },
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
        durations = res.map((element) => element.totalDurationMins);
        numOfProblems = res.map((element) => element.numOfProblems);
        // setting labels (x-axis) & dates
        if (indexTimeBar <= 1) {
          if (indexTimeBar === 0)
            labels = res.map((el) => daysOfTheWeek[el.date.dayOfTheWeek]);
          else labels = res.map((el) => el.date.day.toString());
          dates = res.map(
            (element) =>
              element.date.year +
              "/" +
              element.date.month +
              "/" +
              element.date.day
          );
        } else if (indexTimeBar === 2) {
          // month
          labels = res.map((element) => months[element.date.month]);
          dates = res.map(
            (element) => element.date.year + fullMonths[element.date.month]
          );
        }

        if (indexTimeBar === 0 || indexTimeBar === 2) updateBarChart(true);
        else updateBarChart(true);
      } catch (err) {
        console.log(err);
      }
      setBarFetched(true);
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
      <div className="flex flex-col w-full items-center">
        <div className="border rounded-full w-60 mb-4">
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
        {barFetced && (
          <Bar
            height={400}
            width={500}
            options={barOptions}
            data={barData}
            key={indexTimeBar}
          />
        )}
      </div>
    </div>
  );
}
