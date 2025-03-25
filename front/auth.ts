import { login } from "@/api";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, account, trigger, profile }) {
      if (trigger === "signIn" || trigger === "signUp") {
        if (token.email) {
          // create a database user if it doesn't exist
          login({ email: token.email });
        }
      }
      return token;
    },
  },
  trustHost: true,
});
