"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useProblems } from "@/app/provider/ProblemProvider";

export function CheckBox({ state, size }: { state: boolean; size: number }) {
  if (state) {
    return (
      <Image src={"/checked.svg"} height={size} width={size} alt="checked" />
    );
  }
  return (
    <Image src={"/unchecked.svg"} height={size} width={size} alt="unchecked" />
  );
}

export default function StatusSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [status, setStatus] = useState([false, false, false, false]);
  const statusAll = ["Todo", "Solving", "Solved", "Skipped"];
  const { setFilter } = useProblems();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let statusArray: string[] = [];
    if (params.get("status")) {
      const statusString = decodeURIComponent(params.get("status")!);
      statusArray = statusString.split(",");
    }
    //
    for (let i = 0; i < 4; i++) {
      if (status[i] && !statusArray.includes(statusAll[i])) {
        // adding new status to params
        statusArray.push(statusAll[i]);
      } else if (!status[i] && statusArray.includes(statusAll[i])) {
        // removing status from params
        statusArray = statusArray.filter((status) => status !== statusAll[i]);
      }
    }

    const statusString = statusArray.join(",");
    // updating params
    if (statusString.length > 0) {
      params.set("status", statusString);
    } else {
      params.delete("status");
    }
    // updating URL
    replace(pathname + "?" + params.toString());
    //
    setFilter(params);
  }, [status]);

  useEffect(() => {
    // initial loading -> setting initial values of Status filter
    const params = new URLSearchParams(searchParams);
    if (params.get("status")) {
      const statusString = decodeURIComponent(params.get("status")!);
      const statusArray = statusString.split(",");
      const statusInitial: boolean[] = [];
      for (let i = 0; i < 4; i++) {
        if (statusArray.includes(statusAll[i])) statusInitial.push(true);
        else statusInitial.push(false);
      }
      setStatus(statusInitial);
    }
  }, []);

  function updateStatus(index: number) {
    setStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  }

  return (
    <div className="w-48 p-4 bg-primary-900 rounded-md mb-2">
      <h3 className="text-gray-300">Status</h3>
      <div className="pl-4">
        {statusAll.map((currStatus, index) => (
          <div
            key={index}
            className="flex select-none mt-2 items-center"
            onClick={() => updateStatus(index)}
          >
            <CheckBox state={status[index]} size={15} />
            <p className="ml-1 text-gray-500">{currStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
