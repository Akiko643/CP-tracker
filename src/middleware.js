import { verifyToken } from "@lib/authSession";
import { NextResponse } from "next/server";

const isCommonPage = (pathname) => {
    if (pathname.startsWith("/login") || pathname.startsWith("/signUp")) {
        return 1;
    }
    return 0;
};

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    // console.log("pathname", pathname);

    let token = req.cookies.get("token")?.value;
    const verifiedToken = token && (await verifyToken(token));

    if (pathname.startsWith("/api")) {
        return;
    }
    if (isCommonPage(pathname) && !verifiedToken) {
        return;
    }
    if (isCommonPage(pathname) && verifiedToken) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!verifiedToken) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
