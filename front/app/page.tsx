import Auth from "./components/Auth";
import Problem from "./components/Problem";
import { login } from "@/api";

export default async function Home() {
  const user = await login({ username: "jack", password: "123" });
  return (
    <main className="">
      <Auth>
        <div>{user.user.email}</div>
        <Problem />
      </Auth>
    </main>
  );
}
