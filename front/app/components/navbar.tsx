"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  if (status === "authenticated") {
    return (
      <nav className="w-screen flex justify-between text-text-50 mt-3 mb-2">
        <div className="flex ml-4">
          <Link
            href="/"
            className={`${pathname === "/" ? "navbarLinkAt" : "navbarLink"}`}
          >
            Problems
          </Link>
          <Link
            href="/analytics"
            className={`${
              pathname === "/analytics" ? "navbarLinkAt" : "navbarLink"
            }`}
          >
            Analytics
          </Link>
        </div>
        <div className="flex justify-end mr-2">
          <Link
            href="/profile"
            className={`${
              pathname === "/profile" ? "navbarLinkAt" : "navbarLink"
            }`}
          >
            {session.user.name}
          </Link>
        </div>
      </nav>
    );
  }
  return (
    <div className="flex justify-end text-text-50 mt-3">
      <Link
        href="/signin"
        className={`${pathname === "/signin" ? "navbarLinkAt" : "navbarLink"}`}
      >
        Sign in
      </Link>
      <Link
        href="/signup"
        className={`${pathname === "/signup" ? "navbarLinkAt" : "navbarLink"}`}
      >
        Sign up
      </Link>
    </div>
  );
}
