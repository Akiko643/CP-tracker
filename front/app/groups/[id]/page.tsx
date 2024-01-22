"use server";
import { getProblems } from "@/api";
import ProblemList from "@/app/components/ProblemList";
import Search from "@/app/components/Search";

function StatusIndicator({ status }: { status: string }) {
  if (status == "solved")
    return <div className="w-2 bg-green-500 h-full"></div>;
  if (status == "skipped")
    return <div className="w-2 bg-yellow-500 h-full"></div>;
  return <div className="w-2 bg-red-500 h-full"></div>;
}

export default async function Page({ params }: { params: { id: string } }) {
  const problems = await getProblems();
  return (
    <div className="overflow-y-auto flex flex-row">
      <div className="w-10/12">
        <ProblemList data={problems} />
      </div>
      <Search />
    </div>
  )
}
