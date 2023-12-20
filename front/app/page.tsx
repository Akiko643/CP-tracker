// "use server";

import { useSession } from "next-auth/react";
import Auth from "./components/Auth";
import Problem from "./components/Problem";
import { getProblems, login } from "@/api";
import ProblemList from "./components/ProblemList";

export default function Home() {
  // const { data: session } = useSession();
  return (
    <main className="">
      <ProblemList />
      <Auth>
        <Problem />
      </Auth>
    </main>
  );
}
