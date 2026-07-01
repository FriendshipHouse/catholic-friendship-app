'use client';

import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';

type PieChartProps = {
  value: string;
  title1: string;
  title2: string;
  pieSrc: StaticImageData;
  description: string;
};

function PieChart({ value, title1, title2, pieSrc, description }: Readonly<PieChartProps>) {
  const t = useTranslations('cana.pie');
  return (
    <div key={value} className="flex w-30 flex-col items-center gap-4">
      <div className="flex flex-col gap-1 text-center font-bold">
        <div>{t(`${title1}`)}</div>
        <div>{t(`${title2}`)}</div>
      </div>
      <div className="w-20 sm:w-24">
        <Image src={pieSrc} alt="pieChart_image" loading="lazy" />
      </div>
      <div className="text-center">{t(`${description}`)}</div>
    </div>
  );
}

export default PieChart;
