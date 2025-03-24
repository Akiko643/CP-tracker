"use server";
import ProblemList from "./components/ProblemList";
import StatusSearch from "./components/Filter/StatusSearch";
import DifficultySearch from "./components/Filter/DifficultySearch";
import ProblemAdd from "./components/ProblemAdd";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    return (
      <div className="flex bg-background-900 overflow-y-auto">
        <ProblemAdd />
        <div className="flex flex-row w-full">
          <ProblemList />
          <div className="flex flex-col">
            <StatusSearch />
            <DifficultySearch />
          </div>
        </div>
      </div>
    );
  }
  return <div className="text-white">Unauthenticated user</div>;
}
