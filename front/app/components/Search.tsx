"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Search() {
  const [solved, setSolved] = useState(false);
  const [todo, setTodo] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname(); // current pathname /groups/GROUPID
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let statusArray: string[] = [];
    if (params.get("status")) {
      const statusString = decodeURIComponent(params.get("status")!);
      statusArray = statusString.split(",");
    }
    if (todo && !statusArray.includes("TODO")) {
      statusArray.push("TODO");
    } else if (!todo && statusArray.includes("TODO")) {
      statusArray = statusArray.filter((status) => {
        status === "TODO";
      });
    }
    //
    if (solved && !statusArray.includes("SOLVED")) {
      statusArray.push("SOLVED");
    } else if (!solved && statusArray.includes("SOLVED")) {
      statusArray = statusArray.filter((status) => {
        status === "SOLVED";
      });
    }

    const statusString = statusArray.join(",");
    const statusEncoded = encodeURIComponent(statusString);
    if (statusEncoded.length > 0) {
      replace(`${pathname}?status=${statusEncoded}`);
    } else {
      replace(`${pathname}`);
    }
  }, [solved, todo]);

  useEffect(() => {
    // initial loading -> setting initial values of todo and solved
    const params = new URLSearchParams(searchParams);
    if (params.get("status")) {
      const statusString = decodeURIComponent(params.get("status")!);
      const statusArray = statusString.split(",");
      if (statusArray.includes("TODO")) {
        setTodo(true);
      }
      if (statusArray.includes("SOLVED")) {
        setSolved(true);
      }
    }
  }, []);

  return (
    <div className="text-text-50">
      <div className="flex flex-row">
        <input
          type="checkbox"
          checked={solved}
          onChange={() => setSolved(!solved)}
        />
        <p className="ml-4">Solved</p>
      </div>
      <div className="flex flex-row">
        <input type="checkbox" checked={todo} onChange={() => setTodo(!todo)} />
        <p className="ml-4">Todo</p>
      </div>
    </div>
  );
}
