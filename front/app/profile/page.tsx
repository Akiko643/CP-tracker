"use client";

import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  return (
    <div>
      <button onClick={() => signOut()} className="text-text-50 text-2xl">Signout</button>
    </div>
  )
}