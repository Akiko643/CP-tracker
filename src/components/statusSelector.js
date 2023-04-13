import { useState } from "react";

export default function StatusSelector({ p, setStatus }) {
  const status_color = {
    "Not Attempted": "bg-gray-600",
    Solving: "bg-orange-600",
    Solved: "bg-green-600",
    Reviewing: "bg-red-600",
    Skipped: "bg-blue-600",
    Ignored: "bg-red-900",
  };

  const status_list = [
    "Not Attempted",
    "Solving",
    "Solved",
    "Reviewing",
    "Skipped",
    "Ignored",
  ];
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className={`absolute ${
          open ? "" : "hidden"
        } bg-zinc-800 rounded-xl py-2 text-zinc-400`}
      >
        {status_list.map((s, i) => {
          return (
            <div
              className={`flex items-center py-2 px-4 hover:bg-gray-200 hover:text-black ${
                s == p.status ? "bg-gray-200 text-black" : ""
              }`}
              key={`status-${i}`}
              onMouseDown={() => {
                setStatus(p, s);
              }}
            >
              <div
                className={`rounded-full h-6 w-6 mr-2 ${status_color[s]}`}
              ></div>
              <div>{s}</div>
            </div>
          );
        })}
      </div>
      <div
        tabIndex={1}
        className={`rounded-full h-6 w-6 ${status_color[p.status]}`}
        onFocus={() => {
          setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
        }}
      ></div>
    </div>
  );
}
