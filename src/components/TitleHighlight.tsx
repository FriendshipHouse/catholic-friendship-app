'use client';

import { useLocale } from 'next-intl';

type titleProps = {
  children: string | React.ReactNode;
};

function TitleHighlight({ children }: Readonly<titleProps>) {
  const locale = useLocale();

  return locale === 'zh-TW' ? (
    <div className="text-[30px] font-bold text-black underline decoration-primary decoration-[6px] underline-offset-0 sm:text-3xl md:text-4xl">
      {children}
    </div>
  ) : (
    <div className="relative w-fit">
      <div className="-z-10 absolute w-full h-[6px] bg-primary rounded-sm bottom-[6px] sm:bottom-0" />
      <div className="z-10 flex text-black text-[30px] sm:text-3xl md:text-4xl font-bold">
        {children}
      </div>
    </div>
  );
}

export default TitleHighlight;
