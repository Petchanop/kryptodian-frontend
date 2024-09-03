import { serviceLogout } from '@/lib/auth/serviceLogout';
import type { NextAuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { createGatewayClient } from '../data';

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
        const client = await createGatewayClient();
        const { data, error } = await client.POST(
          "/auth/signin",
          {
            body: {
              username: credentials?.username as string,
              email: credentials?.email as string,
              password: credentials?.password as string
            }
          }
        )
        if (error) {
          return null;
        }

        const res = await fetch(`${process.env.BACKEND_URL}/user/${data.id}`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${data?.accessToken}`,
            "Content-Type": "application/json"
          }
        });
        let user = await res.json();
        if (res.ok && user) {
          user = {
            user: user,
            ...data
          }
          return user;
        }
        return null;
      }
    })
  ],
  callbacks: {
    // returns token object to be consumed by session()
    async jwt( { token, user, account} : {
      token: any,
      user: User,
      account: any,
    }) {
      if (user) {
        return {
          user: user,
          bearerToken: user.accessToken,
        };
      }

      return token;
    },
    // consumes token object; returns session object
    // In session() if any failure occurs, such as fail api call
    // it will unauthorize the user and invalidate the session as side effect
    async session({ session, token }: { session: Session, token: any}) {
      session.token = token.bearerToken;
      session.user = token.user.user;
      return session;
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
    async signOut({ token }) {
      serviceLogout(token.bearerToken as string);
    },
  },
  session: {
    maxAge: parseInt(`${process.env.EXPIRESIN}`), // 4 hours sync with backend //TODO: maybe move to .env
  }
}