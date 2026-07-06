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

  const pushLink = value === 'family' ? 'https://taipeipeo.catholic.org.tw' : `/house/${value}`;

  return (
    <Button
      type="default"
      onClick={() => router.push(pushLink)}
      className="!w-full !text-wrap !bg-white/20 !py-8 !shadow-4xl !backdrop-blur"
      target={value === 'family' ? '_blank' : '_self'}
    >
      {t(`${value}`)}
    </Button>
  );
}

export default HouseButton;
