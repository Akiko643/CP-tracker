"use server";
import Auth from "./components/Auth";
import ProblemList from "./components/ProblemList";
import StatusSearch from "./components/Filter/StatusSearch";
import DifficultySearch from "./components/Filter/DifficultySearch";
import { getProblems } from "@/api";
import ReturnPage from "./components/ReturnPage";
import ProblemAdd from "./components/ProblemAdd";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    status: string | undefined;
    lower: string | undefined;
    upper: string | undefined;
  };
}) {
  const problems = await getProblems({ ...searchParams });
  if (problems.status === 401) {
    return <ReturnPage />;
  }
  let key = "";
  if (searchParams.status) key += searchParams.status;
  if (searchParams.lower) key += searchParams.lower;
  if (searchParams.upper) key += searchParams.upper;

  return (
    <div className="flex bg-background-900 overflow-y-auto">
      <Auth>
        <ProblemAdd />
        <ProblemList data={problems} key={key} />
        <div className="flex flex-col">
          <StatusSearch />
          <DifficultySearch />
        </div>
      </Auth>
    </div>
  );
}
