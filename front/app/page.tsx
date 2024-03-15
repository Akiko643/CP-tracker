"use server";
import Auth from "./components/Auth";
import ProblemList from "./components/ProblemList";
// import Groups from "./components/Groups";
import Sort from "./components/Sort";
import StatusSearch from "./components/StatusSearch";
import DifficultySearch from "./components/DifficultySearch";
import { getGroups, getProblems } from "@/api";
import ReturnPage from "./components/ReturnPage";
import ProblemAdd from "./components/ProblemAdd";
// import { Group } from "@/types/types";
// import Search from "./components/Search";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    status: string | undefined;
  };
}) {
  // const data: any = await getProblems({ status: "" });
  // if (data.status === 401) {
  //   return <ReturnPage />;
  // }

  let status: string = "";
  if (searchParams.status) status = searchParams.status;
  const problems = await getProblems({ status });

  return (
    <div className="flex bg-background-900 overflow-y-auto">
      <Auth>
        <ProblemAdd />
        <ProblemList data={problems} key={searchParams.status} />
        <div className="flex flex-col">
          <StatusSearch />
          <DifficultySearch />
        </div>
        <Sort />
      </Auth>
    </div>
  );
}
