import { useUser } from "@/providers/User.provider";
import { useState } from "react";

export default function StatusSelector({ problem, large = false }) {
  const { problems, setProblems } = useUser();

  const setStatus = (status) => {
    for (let i = 0; i < problems.length; i++) {
      if (problems[i] == problem) {
        let tmp = problems;
        tmp[i].status = status;
      }
    }

    setProblems(problems);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      status: status,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`api/problems/${problem._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

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
    <div className="">
      <div
        tabIndex={1}
        className={`rounded-full relative ${large ? "h-12 w-12" : "h-6 w-6"} ${
          status_color[problem.status]
        }`}
        onFocus={() => {
          setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
        }}
      ></div>
      <div
        className={`absolute z-10 ${
          open ? "" : "hidden"
        } bg-zinc-800 rounded-xl py-2 text-zinc-400`}
      >
        {status_list.map((s, i) => {
          return (
            <div
              className={`flex items-center py-2 px-4 hover:bg-gray-200 hover:text-black ${
                s == problem.status ? "bg-gray-200 text-black" : ""
              }`}
              key={`status-${i}`}
              onMouseDown={() => {
                setStatus(s);
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
    </div>
  );
}
