import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, signUp } from "@/api";

let tmpUser;

export const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // type Record<"username" | "password", string> but has {username, password}
        const res = await login(
          credentials as { username: string; password: string }
        );
        const user = await res.data;
        tmpUser = user;
        // If no error and we have user data, return it
        if (res.status === 200 && user) {
          return user;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    // jwt callback is called before session
    async jwt({ token, user, account, profile }) {
      if (user) {
        if (!profile) {
          // used credentials to login
          token.accessToken = tmpUser!.accessToken;
          token.name = tmpUser!.username;
        } else {
          // used google provider to login
          let responseUser;
          try {
            // try login to backend
            responseUser = await login({
              username: user.email as string,
              password: user.id,
            });
          } catch (err) {
            // signing up the user
            responseUser = await signUp({
              username: user.email as string,
              password: user.id,
            });
          }
          const googleUser = await responseUser.data;
          token.accessToken = googleUser.accessToken;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token.name !== undefined) {
        // logged in using credentials
        session.accessToken = token.accessToken;
        session.user.name = token.name;
      }
      if (!session.accessToken && token.accessToken) {
        // logged in using google
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    // signOut: '/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
