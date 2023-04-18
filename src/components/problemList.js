import { useUser } from "@/providers/User.provider";
import { useEffect, useState } from "react";
import Problem from "./problem";
import Source from "./source";
import StatusSelector from "./statusSelector";

export default function ProblemList() {
  const { problems, filter, popup, setPopup } = useUser();

  return (
    <div className="w-full">
      <Source />
      <div className="w-full flex justify-between border-b border-zinc-400 h-12 items-center">
        <div className="flex w-8/12">
          <div className="px-4 text-zinc-400 text-sm w-1/4">Status</div>
          <div className="px-4 text-zinc-400 text-sm w-3/4">Title</div>
        </div>
        <div className="px-4 text-zinc-400 text-sm w-2/12">Difficulty</div>
      </div>
      <div className="">
        {problems?.map((p, i) => {
          return (
            <div
              className={`flex justify-between py-3 w-full rounded items-center ${
                i % 2 ? "bg-zinc-700" : ""
              }`}
              key={`problem-${i}`}
            >
              <div className="flex w-8/12 items-center">
                <div className="w-1/4 px-4">
                  <StatusSelector problem={p} />
                </div>
                <h2
                  className="cursor-pointer flex-1 hover:text-zinc-700 transition duration-200 ease-linear"
                  onClick={() => {
                    setPopup({ ...popup, type: "problem", data: p });
                  }}
                >
                  {p.title}
                </h2>
              </div>
              <h2 className="w-2/12 px-4">{p.difficulty}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
