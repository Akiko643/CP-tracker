"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useProblems } from "@/app/provider/ProblemProvider";

export default function RangeSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [minRating, setMinRating] = useState<string>("");
  const [maxRating, setMaxRating] = useState<string>("");
  const { setFilter } = useProblems();

  useEffect(
    useDebouncedCallback(() => {
      let params = new URLSearchParams(searchParams);
      // minRating
      if (params.get("minRating") && minRating === "") {
        params.delete("minRating");
      } else if (minRating.length > 0) {
        params.set("minRating", minRating);
      }
      // maxRating
      if (params.get("maxRating") && maxRating === "") {
        params.delete("maxRating");
      } else if (maxRating.length > 0) {
        params.set("maxRating", maxRating);
      }
      replace(pathname + "?" + params.toString());
      //
      setFilter(params);
    }, 300),
    [minRating, maxRating]
  );

  // initial loading -> setting initial values of Range filter
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (params.get("minRating")) setMinRating(params.get("minRating")!);
    if (params.get("maxRating")) setMaxRating(params.get("maxRating")!);
  }, []);

  return (
    <div>
      <h3 className="text-gray-300 mb-1">Range</h3>
      <div className="flex pl-4">
        <input
          type="number"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="pl-1 text-gray-300 w-16 bg-transparent border border-gray-500 rounded-sm h-6"
        ></input>
        <p className="text-gray-500">-</p>
        <input
          type="number"
          value={maxRating}
          onChange={(e) => setMaxRating(e.target.value)}
          className="pl-1 text-gray-300 w-16 bg-transparent border border-gray-500 rounded-sm h-6"
        ></input>
      </div>
    </div>
  );
}
