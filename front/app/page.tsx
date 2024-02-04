"use server";
import Auth from "./components/Auth";
import ProblemList from "./components/ProblemList";
import Groups from "./components/Groups";
import Sort from "./components/Sort";
import { getGroups, getProblems } from "@/api";
import ReturnPage from "./components/ReturnPage";
import ProblemAdd from "./components/ProblemAdd";
import { Group } from "@/types/types";

export default async function Home() {
  const data: any = await getProblems({ status: "", groupId: "" });
  if (data.status === 401) {
    return <ReturnPage />;
  }
  const groups: Group[] = await getGroups();
  return (
    <div className="flex bg-background-900 overflow-y-auto">
      <Auth>
        <ProblemAdd />
        <Groups />
        <ProblemList
          groups={groups}
          data={data}
          groupId={undefined}
          groupname="Recents"
        />
        <Sort />
      </Auth>
    </div>
  );
}
