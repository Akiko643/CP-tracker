import Image from "next/image";
import Auth from "./components/Auth";
import ProblemList from "./components/ProblemList";
import Groups from "./components/Groups";
import Sort from "./components/Sort";
import { getProblems } from "@/api";
import ReturnPage from "./components/ReturnPage";
import ProblemAdd from "./components/ProblemAdd";

export default async function Home() {
  const data: any = await getProblems();
  if (data.status === 401) {
    return <ReturnPage />;
  }
  return (
    <div className="flex bg-background-900 w-full h-full">
      <Auth>
        <ProblemAdd />
        <Groups />
        <ProblemList data={data} />
        <Sort />
      </Auth>
    </div>
  );
}
