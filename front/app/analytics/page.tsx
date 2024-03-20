"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAnalyticsTimeBar } from "@/api";
import { BarDayElement } from "@/types/types";
import { Bar } from "react-chartjs-2";
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

  const timespans = ["week", "month", "year", "all"];
  const [indexTimeBar, setIndexTimeBar] = useState<number>(0);
  // Bar data
  let labels: String[] = [];
  const data = {
    labels: labels,
    datasets: [
      {
        data: [10, 15, 20, 1],
        borderColor: "#36A2EB",
        backgroundColor: "#9BD0F5",
      },
    ],
  };

  const options = {
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
  };


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
        const res: BarDayElement[] = await getAnalyticsTimeBar(timespans[indexTimeBar]);
        if (indexTimeBar === 0) { // week
          const durations = res.map((element) => element.totalDuration);
          console.log(durations);
          // Total duration
          data.datasets[0].data = durations;
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
        <Bar height={300} options={options} data={data} />
      </div>
    </div>
  );
}
