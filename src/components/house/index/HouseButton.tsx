'use client';

import { Button } from 'antd';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/routing';

type HouseButtonType = {
  value: string;
};

function HouseButton({ value }: Readonly<HouseButtonType>) {
  const t = useTranslations('about');
  const router = useRouter();

  return (
    <Button
      type="default"
      onClick={() => router.push(`/house/${value}`)}
      className="!w-full !text-wrap !bg-white/20 !py-8 !shadow-4xl !backdrop-blur"
    >
      {t(`${value}`)}
    </Button>
  );
}

export default HouseButton;
