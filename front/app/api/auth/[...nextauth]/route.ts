import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:5001/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
          credentials: 'include'
        })
        // add accesstoken to the user
        const user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        return null
      }
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
        if (!profile) { // used credentials to login
          token.accessToken = user.accessToken;
          token.name = user.username;
        } else { // used google provider to login
          let responseUser = await fetch("http://localhost:5001/login", {
            method: 'POST',
            body: JSON.stringify({ username: user.email, password: user.id }),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
          });
          if (responseUser.status !== 200) { // first time signin using google
              responseUser = await fetch("http://localhost:5001/signup", {
              method: 'POST',
              body: JSON.stringify({ username: user.email, password: user.id }),
              headers: { "Content-Type": "application/json" },
              credentials: 'include'
            });
          }
          const googleUser = await responseUser.json();
          token.accessToken = googleUser.accessToken;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token.name !== undefined) { // logged in using credentials
        session.accessToken = token.accessToken;
        session.user.name = token.name;
      }
      if (!session.accessToken && token.accessToken) { // logged in using google
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
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
