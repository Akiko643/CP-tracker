"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Auth from "./components/Auth";

export default function Home() {
  return (
    <main className="">
      <Auth>
        <div>hello world</div>
        <button onClick={() => signOut()}>signOut</button>
      </Auth>
    </main>
  );
}
