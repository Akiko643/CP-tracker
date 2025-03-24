import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, account, trigger, profile }) {
      if (trigger === "signIn") {
        console.log("callback");
        console.log(token);
        console.log(account);
        console.log(trigger);
        console.log(profile);
        console.log("");
      }
      return token;
    },
  },
});
