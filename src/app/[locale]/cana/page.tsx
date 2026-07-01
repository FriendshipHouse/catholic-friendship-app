'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import CanaButton from '@/components/cana/index/CanaButton';

import canaImage from '@/../public/general/img-pouring.png';

const aboutButtonList = [
  { value: 'statement' },
  { value: 'moreCana' },
  { value: 'milestone' },
  { value: 'donate' },
  { value: 'grow' },
  { value: 'prayer' },
  { value: 'testimony' },
  { value: 'canaEvents' },
];

function CanaIndex() {
  const t = useTranslations('cana');
  return (
    <div className="relative flex flex-col items-center gap-5 md:flex-row md:justify-between">
      <div className="hidden items-center p-5 md:flex">
        <Image src={canaImage} alt="canaImage" loading="lazy" />
      </div>
      <div className="absolute z-0 flex items-center p-5 opacity-10 md:hidden">
        <Image src={canaImage} alt="canaImage" loading="lazy" />
      </div>
      <div className="z-10 flex flex-col gap-6 md:w-1/2">
        <div className="flex flex-col gap-4 whitespace-pre-wrap leading-6">
          <div className="text-gray-60">{t('description')}</div>
        </div>
        <div className="container grid grid-cols-2 gap-x-6 gap-y-4">
          {aboutButtonList.map(({ value }) => (
            <CanaButton key={value} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CanaIndex;
