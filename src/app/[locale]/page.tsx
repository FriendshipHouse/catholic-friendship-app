'use client';

import { Button, Spin } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function IndexPage() {
  const { data: session, status } = useSession();
  const isSessionLoading = status === 'loading';

  if (isSessionLoading) {
    return <Spin />;
  }

  return (
    <div className="flex h-full w-full flex-col justify-center items-center text-2xl text-amber-500 font-bold gap-4">
      <div>welcome to friendship house</div>
      {!session && (
        <Button type="primary" onClick={() => signIn('google')}>
          Sign In
        </Button>
      )}
      {session && (
        <div className="flex flex-col gap-4 text-sm text-gray-900">
          <Button type="primary" onClick={() => signOut()}>
            Sign Out
          </Button>
          {session.user?.name}
          {session.user?.email}
        </div>
      )}
    </div>
  );
}
