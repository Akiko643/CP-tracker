"use server";
import Auth from "./components/Auth";
import ProblemList from "./components/ProblemList";
import StatusSearch from "./components/StatusSearch";
import DifficultySearch from "./components/DifficultySearch";
import { getProblems } from "@/api";
import ReturnPage from "./components/ReturnPage";
import ProblemAdd from "./components/ProblemAdd";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    status: string | undefined;
  };
}) {

  let status: string = "";
  if (searchParams.status) status = searchParams.status;

  const problems = await getProblems({ status });
  if (problems.status === 401) {
    return <ReturnPage />
  }

  return (
    <div className="flex bg-background-900 overflow-y-auto">
      <Auth>
        <ProblemAdd />
        <ProblemList data={problems} key={searchParams.status} />
        <div className="flex flex-col">
          <StatusSearch />
          <DifficultySearch />
        </div>
      </Auth>
    </div>
  );
}
