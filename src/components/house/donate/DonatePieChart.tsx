'use client';

import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';

type DonatePieChartProps = {
  value: string;
  title1: string;
  title2: string;
  pieSrc: StaticImageData;
  percentage1: string;
  percentage2: string;
};

function DonatePieChart({
  value,
  title1,
  title2,
  pieSrc,
  percentage1,
  percentage2,
}: Readonly<DonatePieChartProps>) {
  const t = useTranslations('houseDonatePie');
  return (
    <div key={value} className="flex w-28 flex-col items-center gap-4">
      <div className="flex flex-col gap-1 text-center font-bold">
        <div>{t(`${title1}`)}</div>
        <div>{t(`${title2}`)}</div>
      </div>
      <div className="w-20 sm:w-24">
        <Image src={pieSrc} alt="pieChart_image" loading="lazy" />
      </div>
      <div className="flex max-w-32 flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 min-w-4 bg-primary-30" />
          <div className="">{t(`${percentage1}`)}</div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="mt-1 h-4 w-4 min-w-4 bg-primary" />
          <div className="text-wrap">{t(`${percentage2}`)}</div>
        </div>
      </div>
    </div>
  );
}

export default DonatePieChart;
