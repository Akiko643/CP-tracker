"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <nav className="flex justify-between text-text-50 mt-3 w-screen">
        <div className="flex">
          <Link href="/" className="navbarLink">Problems</Link>
          <Link href="/analytics" className="navbarLink">Analytics</Link>
        </div>
        <div className="flex justify-end mr-2">
          <Link href="/profile" className="navbarLink">{session.user.name}</Link>
        </div>
      </nav>
    )
  } else {
    return (
      <div className="flex justify-end text-text-50 mt-3">
        <Link href="/signin" className="navbarLink">Sign in</Link>
        <Link href="/signup" className="navbarLink">Sign up</Link>
      </div>
    )
  }
}