"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Auth from "./components/Auth";
import Problem from "./components/Problem";

export default function Home() {
  return (
    <main className="">
      <Auth>
        <Problem />
      </Auth>
    </main>
  );
}
