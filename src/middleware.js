import { verifyToken } from "@lib/auth";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req) {
    let token = req.cookies.get("user-token")?.value;
    const verifiedToken = token && verifyToken(token);
    if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
        return;
    }

    if (req.nextUrl.pathname.startsWith("/login") && verifiedToken) {
        return NextResponse.redirect(new URL("/"), req.url);
    }

    if (!verifiedToken) {
        return NextResponse.redirect(new URL("/login"), req.url);
    }
}
export const config = {
    matcher: "/api/:path*",
};
