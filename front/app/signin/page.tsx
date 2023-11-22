"use client";

import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <main className="">
      <button onClick={() => signIn("github")}>github signIn</button>
    </main>
  );
}
