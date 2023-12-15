"use client";

import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div>
        <p>Signed in as {session.user!.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div>
      <a href="/signin">Sign in</a>
      <a href="/signup">Sign up</a>
    </div>
  )
}