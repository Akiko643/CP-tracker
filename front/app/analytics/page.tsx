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
  // TODO: useState for data & options to re-render the bar chart
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
            return ["test", context.dataIndex.toString(), "amaraa"];
          },
        },
      },
    },
  });

  // update bar data
  // useEffect((
  //   fetchData();
  // ) => {}, [indexTimeBar]);

  // initial loading
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get("timespan")) {
      const timespan = params.get("timespan")!;
      const index = timespans.indexOf(timespan);
      setIndexTimeBar(index);
    }

    async function fetchData() {
      try {
        const res: BarDayElement[] = await getAnalyticsTimeBar(
          timespans[indexTimeBar]
        );
        if (indexTimeBar === 0) {
          // week
          // converting ms to minute
          const durations = res.map((element) => element.totalDuration / 60000);
          const labels = res.map(
            (element) => daysOfTheWeek[element.date.dayOfTheWeek]
          );
          setBarData({
            ...barData,
            labels: labels,
            datasets: [
              {
                label: "Total try duration",
                data: durations,
                borderColor: "#36A2EB",
                backgroundColor: "#9BD0F5",
              },
            ],
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
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
        <div className="">
          <button
            onClick={() => {
              setIndexTimeBar(0);
              setParam({ field: "timespan", value: "" });
            }}
            className="py-1 border-y border-l rounded-l-full w-20 hover:bg-blue-300 hover:border-x hover:rounded-r-full"
          >
            week
          </button>
          <button
            onClick={() => {
              setIndexTimeBar(1);
              setParam({ field: "timespan", value: "month" });
            }}
            className="py-1 border-y w-20"
          >
            month
          </button>
          <button
            onClick={() => {
              setIndexTimeBar(2);
              setParam({ field: "timespan", value: "year" });
            }}
            className="py-1 border-y w-20"
          >
            year
          </button>
          <button
            onClick={() => {
              setIndexTimeBar(1);
              setParam({ field: "timespan", value: "all" });
            }}
            className="py-1 border-y border-r rounded-r-full w-20"
          >
            all
          </button>
        </div>
        <Bar height={300} options={barOptions} data={barData} />
      </div>
    </div>
  );
}
