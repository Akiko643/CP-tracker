import Auth from "./components/Auth";
import Problem from "./components/Problem";
import ProblemList from "./components/ProblemList";

export default function Home() {
  return (
    <main className="">
      <ProblemList />
      <Auth>
        <Problem />
      </Auth>
    </main>
  );
}
