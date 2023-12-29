import Image from "next/image";
import Auth from "./components/Auth";
import ProblemList from "./components/ProblemList";
import Groups from "./components/Groups";
import Sort from "./components/Sort";

export default function Home() {
  return (
    <div className="flex p-8 bg-background-900 w-screen h-screen">
      <Auth>
        <Groups />
        <ProblemList />
        <Sort />
      </Auth>
    </div>
  );
}
