"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function CheckBox({ state, size }: { state: boolean; size: number }) {
  if (state) {
    return (
      <Image src={"/checked.svg"} height={size} width={size} alt="checked" />
    );
  }
  return (
    <Image src={"/unchecked.svg"} height={size} width={size} alt="unchecked" />
  );
}

export default function Search() {
  const [todo, setTodo] = useState(false);
  const [solving, setSolving] = useState(false);
  const [solved, setSolved] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname(); // current pathname /groups/GROUPID
  const { replace } = useRouter();

  // Problem status: Todo / Solving / Solved / Skipped
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let statusArray: string[] = [];
    if (params.get("status")) {
      const statusString = decodeURIComponent(params.get("status")!);
      statusArray = statusString.split(",");
    }
    // in params, checking if Todo is in
    if (todo && !statusArray.includes("Todo")) {
      statusArray.push("Todo");
    } else if (!todo && statusArray.includes("Todo")) {
      statusArray = statusArray.filter((status) => status !== "Todo");
    }
    // in params, Solving-state
    if (solving && !statusArray.includes("Solving")) {
      statusArray.push("Solving");
    } else if (!solving && statusArray.includes("Solving")) {
      statusArray = statusArray.filter((status) => status !== "Solving");
    }
    // in params, Solved-state
    if (solved && !statusArray.includes("Solved")) {
      statusArray.push("Solved");
    } else if (!solved && statusArray.includes("Solved")) {
      statusArray = statusArray.filter((status) => status !== "Solved");
    }
    // in params, Skipped-state
    if (skipped && !statusArray.includes("Skipped")) {
      statusArray.push("Skipped");
    } else if (!skipped && statusArray.includes("Skipped")) {
      statusArray = statusArray.filter((status) => status !== "Skipped");
    }

    const statusString = statusArray.join(",");
    const statusEncoded = encodeURIComponent(statusString);
    if (statusEncoded.length > 0) {
      replace(`${pathname}?status=${statusEncoded}`);
    } else {
      replace(`${pathname}`);
    }
  }, [todo, solving, solved, skipped]);

  useEffect(() => {
    // initial loading -> setting initial values of todo and solved
    const params = new URLSearchParams(searchParams);
    if (params.get("status")) {
      const statusString = decodeURIComponent(params.get("status")!);
      const statusArray = statusString.split(",");
      if (statusArray.includes("Todo")) {
        setTodo(true);
      }
      if (statusArray.includes("Solving")) {
        setSolving(true);
      }
      if (statusArray.includes("Solved")) {
        setSolved(true);
      }
      if (statusArray.includes("Skipped")) {
        setSkipped(true);
      }
    }
  }, []);

  return (
    <div className="w-48 p-4 bg-primary-900 rounded-md mb-2">
      <h3 className="text-gray-300">Status</h3>
      <div className="pl-4">
        <div
          className="flex select-none mt-2 items-center"
          onClick={() => setTodo(!todo)}
        >
          <CheckBox state={todo} size={15} />
          <p className="ml-1 text-gray-500">Todo</p>
        </div>

        <div
          className="flex select-none mt-2 items-center"
          onClick={() => setSolving(!solving)}
        >
          <CheckBox state={solving} size={15} />
          <p className="ml-1 text-gray-500">Solving</p>
        </div>

        <div
          className="flex select-none mt-2 items-center"
          onClick={() => setSolved(!solved)}
        >
          <CheckBox state={solved} size={15} />
          <p className="ml-1 text-gray-500">Solved</p>
        </div>

        <div
          className="flex select-none mt-2 items-center"
          onClick={() => setSkipped(!skipped)}
        >
          <CheckBox state={skipped} size={15} />
          <p className="ml-1 text-gray-500">Skipped</p>
        </div>
      </div>
    </div>
  );
}
