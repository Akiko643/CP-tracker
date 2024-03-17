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
  const fullParams = {
    status: searchParams.status || "",
    lower: searchParams.lower || "0",
    upper: searchParams.upper || "5000",
  };
  const problems = await getProblems({ ...fullParams });
  if (problems.status === 401) {
    return <ReturnPage />;
  }
  let key = "";
  key += "status:" + fullParams.status;
  key += "lower:" + fullParams.lower;
  key += "upper" + fullParams.upper;
  return (
    <div className="flex bg-background-900 overflow-y-auto">
      <Auth>
        <ProblemAdd />
        <div className="flex flex-row w-full">
          <ProblemList data={problems} key={key} />
          <div className="flex flex-col">
            <StatusSearch />
            <DifficultySearch />
          </div>
        </div>
      </Auth>
    </div>
  );
}
