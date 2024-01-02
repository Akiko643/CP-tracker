"use client";

import { signOut } from "next-auth/react";

export default function Profile() {
  return (
    <div>
      <button onClick={() => signOut()} className="text-text-50 text-2xl">Signout</button>
    </div>
  )
}