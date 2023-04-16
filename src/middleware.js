import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    let token = request.cookies.get("token");
    request.cookies.set("token", "123");

    console.log("token:", token);
    // const response = NextResponse.next();
    request.cookies.set({ name: "bobo", value: "wtf" });
    // const cookie = request.cookies.get("bobo");
    // console.log(cookie);
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/api/:path*",
};
