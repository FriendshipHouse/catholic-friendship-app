'use client';

import { useMemo } from 'react';

import { useTranslations } from 'next-intl';

import TitleHighlight from '@/components/TitleHighlight';
import Background from '@/components/layout/Background';
import Footer from '@/components/layout/Footer';

import { usePathname } from '@/i18n/routing';

function UpcomingLayout({ children }: Readonly<RootProvider>) {
  const pathname = usePathname();
  const t = useTranslations('pathname');

  const title = useMemo<string | null>(() => {
    if (!pathname || pathname === '/') return null;

    const pathnames = pathname.split('/');
    const pageName = pathnames[pathnames.length - 1];

    return pageName;
  }, [pathname]);

  return (
    <div className="flex w-full flex-col">
      <Background />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-lg flex-col justify-between bg-white shadow-4xl">
        <div className="flex h-full flex-col pb-5">
          <div className="p-5 md:p-10">
            <TitleHighlight>{t(title)}</TitleHighlight>
          </div>
          <div className="h-full p-5 md:px-10">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UpcomingLayout;
