"use server";
import Auth from "./components/Auth";
import ProblemList from "./components/ProblemList";
import StatusSearch from "./components/Filter/StatusSearch";
import DifficultySearch from "./components/Filter/DifficultySearch";
import ProblemAdd from "./components/ProblemAdd";

export default async function Page() {
  return (
    <div className="flex bg-background-900 overflow-y-auto">
      <Auth>
        <ProblemAdd />
        <div className="flex flex-row w-full">
          <ProblemList />
          <div className="flex flex-col">
            <StatusSearch />
            <DifficultySearch />
          </div>
        </div>
      </Auth>
    </div>
  );
}
