'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import HouseButton from '@/components/house/index/HouseButton';

import aboutImage from '@/../public/general/img-dance.png';

const aboutButtonList = [
  { value: 'member' },
  { value: 'priest' },
  { value: 'contact' },
  { value: 'friendship' },
  { value: 'family' },
];

function HouseIndex() {
  const t = useTranslations('houseIndex');
  return (
    <div className="relative flex flex-col items-center gap-5 md:flex-row md:justify-between">
      <div className="hidden items-center p-5 md:flex">
        <Image src={aboutImage} alt="aboutImage" loading="lazy" />
      </div>
      <div className="absolute z-0 flex items-center p-5 opacity-10 md:hidden">
        <Image src={aboutImage} alt="aboutImage" loading="lazy" />
      </div>
      <div className="z-10 flex flex-col gap-6 md:w-1/2">
        <div className="flex flex-col gap-4 whitespace-pre-wrap leading-6">
          <div className="text-lg font-bold">{t('title1')}</div>
          <p>{t('content1')}</p>
          <div className="text-lg font-bold">{t('title2')}</div>
          <p>{t('content2')}</p>
        </div>
        <div className="container grid grid-cols-2 gap-x-6 gap-y-4">
          {aboutButtonList.map(({ value }) => (
            <HouseButton key={value} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HouseIndex;
