import Image from "next/image";
import Auth from "./components/Auth";
import ProblemList from "./components/problemList";
import Groups from "./components/groups";
import Sort from "./components/sort";

export default function Home() {
  return (
    <div className="flex p-8">
      <Auth>
        <Groups />
        <ProblemList />
        <Sort />
      </Auth>
    </div>
  );
}
