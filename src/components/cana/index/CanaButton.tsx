'use client';

import { Button } from 'antd';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/routing';

type HouseButtonType = {
  value: string;
};

function CanaButton({ value }: Readonly<HouseButtonType>) {
  const t = useTranslations('pathname');
  const router = useRouter();

  const pushLink =
    value === 'canaEvents' ? 'https://taipeipeo.catholic.org.tw/family' : `/cana/${value}`;

  return (
    <Button
      type="default"
      onClick={() => router.push(pushLink)}
      className="!w-full !text-wrap !bg-white/20 !py-8 !shadow-4xl !backdrop-blur"
    >
      {t(`${value}`)}
    </Button>
  );
}

export default CanaButton;
