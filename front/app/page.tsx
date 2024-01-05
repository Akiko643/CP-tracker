import Image from "next/image";
import Auth from "./components/Auth";
import ProblemList from "./components/ProblemList";
import Groups from "./components/Groups";
import Sort from "./components/Sort";
import ProblemAdd from "./components/ProblemAdd";

export default function Home() {
  return (
    <div className="flex bg-background-900 w-full h-full">
      <Auth>
        <ProblemAdd />
        <Groups />
        <ProblemList />
        <Sort />
      </Auth>
    </div>
  );
}
