import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const checkAuthorization = async (req: NextRequest) => {
  const { NEXTAUTH_SECRET: secret = '' } = process.env ?? {};

  try {
    const { isAdmin = false } = (await getToken({ req, secret })) ?? {};

    if (!isAdmin) throw new Error();
  } catch (error) {
    console.error('Taken get error:', error);
    throw new Error();
  }

  return true;
};
