import Auth from "./components/Auth";
import Problem from "./components/Problem";
import { login } from "@/api";

export default async function Home() {
  return (
    <main className="">
      <Auth>
        <Problem />
      </Auth>
    </main>
  );
}
