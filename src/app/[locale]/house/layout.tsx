'use client';

import { useMemo } from 'react';

import { useTranslations } from 'next-intl';

import Background from '@/components/layout/Background';
import Footer from '@/components/layout/Footer';
import SubTitle from '@/components/layout/SubTitle';

import { usePathname } from '@/i18n/routing';

function AboutLayout({ children }: Readonly<RootProvider>) {
  const pathname = usePathname();
  const t = useTranslations('');

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
        <div className="flex h-full flex-col">
          <div className="px-5 pt-5 md:px-10 md:pt-10">
            <SubTitle title={t(`pathname.${title}`)} />
          </div>
          <div className="h-full p-5 md:p-10">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AboutLayout;
