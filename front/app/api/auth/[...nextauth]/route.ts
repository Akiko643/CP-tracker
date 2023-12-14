import NextAuth,  { Account, Profile, Session, TokenSet, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { EmailConfig } from "next-auth/providers/email";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:5001/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
          credentials: 'include'
        })
        const user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    // jwt callback is called before session
    async jwt({ token, user, account, profile }) {
      if (user) {
        if (!profile) { // used credentials to login
          const res = await fetch("http://localhost:5001/generateToken", {
            method: 'POST',
            body: JSON.stringify({ name: user.username}),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          });
          token.name = user.username;
          token.accessToken = await res.json();
        } else { // used google provider to login
          const res = await fetch("http://localhost:5001/generateToken", {
            method: 'POST',
            body: JSON.stringify({ name: user.email}),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          })
          token.accessToken = await res.json();
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token.name !== undefined) { // logged in using credentials
        session.accessToken = token.accessToken;
        session.user.name = token.name;
      }
      if (!session.accessToken && token.accessToken) {
        // setting an session accessToken when logged in using google
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
    // signOut: '/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    
  },
});

export { handler as GET, handler as POST }
