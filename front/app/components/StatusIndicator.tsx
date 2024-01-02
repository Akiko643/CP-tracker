"use client";

function Indicator({ status }: { status: string }) {
  if (status == "solved")
    return <div className="w-2 bg-green-500 h-full"></div>;
  if (status == "skipped")
    return <div className="w-2 bg-yellow-500 h-full"></div>;
  return <div className="w-2 bg-red-500 h-full"></div>;
}

export const StatusIndicator = ({}) => {
  return (
    <div
      className="w-8 flex justify-center h-full"
      // onClick={() => {
      //   setProblems([
      //     ...problems.slice(0, i),
      //     {
      //       ...problems[i],
      //       status: nextStatus(problem.status),
      //     },
      //     ...problems.slice(i + 1),
      //   ]);
      // }}
    >
      {/* <StatusIndicator status={problem.status} /> */}
    </div>
  );
};
