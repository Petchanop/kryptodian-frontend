import { serviceLogout } from '@/lib/auth/serviceLogout';
import { TMeGet } from '@/nextauth';
import type { NextAuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "username", placeholder: "" },
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "" }
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: credentials?.username as string,
            email: credentials?.email as string,
            password: credentials?.password as string
          })
        });
        if (res.ok) {
          let user = await res.json();
          return user
        }
        return null;
      }
    })
  ],
  callbacks: {
    // returns token object to be consumed by session()
    async jwt({ token, user }: {
      token: any,
      user: User,
    }) {
      if (user) {
        return {
          user: { ...user },
          token: token.accessToken
        }
      }
      return token;
    },
    // consumes token object; returns session object
    // In session() if any failure occurs, such as fail api call
    // it will unauthorize the user and invalidate the session as side effect
    async session({ session, token }: { session: Session, token: any, user: User }) {
      console.log(token);
      session.user = token.user
      session.token = token.user.accessToken
      return session
    },
    async signIn({ credentials }: {
      user: User,
      account: any,
      profile?: any,
      credentials?: any
    }) {
      return true;
    }
  },
  events: {
    async signOut({token}) {
      const auth: TMeGet = token.user as TMeGet
      serviceLogout(auth.accessToken as string);
    },
  },
  session: {
    maxAge: parseInt(`${process.env.EXPIRESIN}`), // 4 hours sync with backend //TODO: maybe move to .env
  }
}