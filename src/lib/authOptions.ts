import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import adminsModel from '@/models/adminsModel';

import connectMongo from './connectMongo';

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
    async session({ session, token }) {
      return { ...session, user: { ...session?.user, isAdmin: Boolean(token?.isAdmin) } };
    },
    async jwt({ token }) {
      const { email = '' } = token ?? {};
      try {
        await connectMongo();
        const admin = await adminsModel.findOne({ email });
        const isAdmin = !!admin;
        return { ...token, isAdmin };
      } catch (error) {
        console.error('Model find error:', error);
        return token;
      }
    },
  },
};
