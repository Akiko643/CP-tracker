"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Search() {
  const [solved, setSolved] = useState(false);
  const [todo, setTodo] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname(); // current pathname
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (todo) {
      params.set("TODO", "true");
    } else {
      params.delete("TODO");
    }
    if (solved) {
      params.set("SOLVED", "true");
    } else {
      params.delete("SOLVED");
    }
    replace(`${pathname}?${params.toString()}`); // update URL
  }, [solved, todo]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setSolved(params.get("SOLVED") === "true" || false);
    setTodo(params.get("TODO") === "true" || false);
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
