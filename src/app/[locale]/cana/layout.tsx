'use client';

import { useTranslations } from 'next-intl';

import Background from '@/components/layout/Background';
import Footer from '@/components/layout/Footer';
import SubTitle from '@/components/layout/SubTitle';

function CanaLayout({ children }: Readonly<RootProvider>) {
  const t = useTranslations();

  return (
    <div className="flex w-full flex-col">
      <Background />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-lg flex-col justify-between bg-white shadow-4xl">
        <div className="flex h-full flex-col">
          <div className="px-5 pt-5 md:px-10 md:pt-10">
            <SubTitle title={t('pathname.cana')} />
          </div>
          <div className="h-full p-5 md:p-10">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default CanaLayout;
