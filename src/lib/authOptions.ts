import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const {
  NEXTAUTH_SECRET: secret = '',
  GOOGLE_CLIENT_ID: clientId = '',
  GOOGLE_CLIENT_SECRET: clientSecret = '',
} = process.env ?? {};

export const authOptions: NextAuthOptions = {
  secret,
  providers: [GoogleProvider({ clientId, clientSecret })],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account?.provider === 'google') {
        return profile?.email_verified && profile?.email?.endsWith('@gmail.com');
      }
      return true;
    },
    async session(params) {
      const { session, token } = params;
      return { ...session, user: { ...session?.user, isAdmin: Boolean(token?.isAdmin) } };
    },
  },
};
