"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <nav className="flex text-text-50 mt-6 w-screen">
        <div>
          <Link href="/" className="mx-4 hover:text-fuchsia-300">Problems</Link>
          <Link href="/analytics" className="mr-4 hover:text-fuchsia-300">Analytics</Link>
        </div>
        <div className="flex justify-end">
          <Link href="/profile" className="mr-4 hover:text-fuchsia-300">{session.user.name}</Link>
        </div>
      </nav>
    )
  } else {
    return (
      <div className="flex justify-end text-text-50 mt-4">
        <Link href="/signin" className="hover:bg-text-50 hover:rounded-2xl py-1 px-4 mx-1 hover:text-background-900">Sign in</Link>
        <Link href="/signup" className="hover:bg-text-50 hover:rounded-2xl py-1 px-4 mx-1 hover:text-background-900">Sign up</Link>
      </div>
    )
  }
}