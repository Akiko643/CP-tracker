"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useProblems } from "@/app/provider/ProblemProvider";

export default function RangeSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [lower, setLower] = useState<string>("");
  const [upper, setUpper] = useState<string>("");
  const { setFilter } = useProblems();

  useEffect(
    useDebouncedCallback(() => {
      let params = new URLSearchParams(searchParams);
      // lower
      if (params.get("lower") && lower === "") {
        params.delete("lower");
      } else if (lower.length > 0) {
        params.set("lower", lower);
      }
      // upper
      if (params.get("upper") && upper === "") {
        params.delete("upper");
      } else if (upper.length > 0) {
        params.set("upper", upper);
      }
      replace(pathname + "?" + params.toString());
      //
      setFilter(params);
    }, 300),
    [lower, upper]
  );

  // initial loading -> setting initial values of Range filter
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get("lower")) setLower(params.get("lower")!);
    if (params.get("upper")) setUpper(params.get("upper")!);
  }, []);

  return (
    <div>
      <h3 className="text-gray-300 mb-1">Range</h3>
      <div className="flex pl-4">
        <input
          type="number"
          value={lower}
          onChange={(e) => setLower(e.target.value)}
          className="pl-1 text-gray-300 w-16 bg-transparent border border-gray-500 rounded-sm h-6"
        ></input>
        <p className="text-gray-500">-</p>
        <input
          type="number"
          value={upper}
          onChange={(e) => setUpper(e.target.value)}
          className="pl-1 text-gray-300 w-16 bg-transparent border border-gray-500 rounded-sm h-6"
        ></input>
      </div>
    </div>
  );
}
