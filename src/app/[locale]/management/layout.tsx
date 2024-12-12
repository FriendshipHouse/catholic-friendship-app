'use client';

import { Button, Spin } from 'antd';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

type LayoutProps = {
  children?: React.ReactNode;
};

function ManagementLayout({ children }: Readonly<LayoutProps>) {
  const t = useTranslations();
  const { data: session, status } = useSession();

  const isSessionLoading = status === 'loading';

  if (isSessionLoading) {
    return <Spin />;
  }

  return session?.user?.isAdmin ? (
    <div className="w-full">{children}</div>
  ) : (
    <div className="flex w-full justify-center items-center flex-col gap-6 text-xl font-bold">
      {t('management.permissionDeny')}
      <Link href="/">
        <Button>{t('management.backHome')}</Button>
      </Link>
    </div>
  );
}

export default ManagementLayout;
