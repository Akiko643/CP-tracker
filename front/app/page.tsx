import Auth from "./components/Auth";
import ProblemList from "./components/ProblemList";

export default function Home() {
  return (
    <main className="">
      <Auth>
        <ProblemList />
      </Auth>
    </main>
  );
}
