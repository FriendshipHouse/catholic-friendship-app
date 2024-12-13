'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';

type DonateMethodCardProps = {
  value: string;
  imageSrc: StaticImageData;
  content: React.ReactNode;
  buttonLabel?: string;
  buttonLink?: string;
};

function DonateMethodCard({
  value,
  imageSrc,
  content,
  buttonLabel,
  buttonLink,
}: Readonly<DonateMethodCardProps>) {
  const t = useTranslations('about-donate');

  return (
    <div className="flex min-h-36 w-full flex-col justify-center gap-4 rounded-md border border-gray-40 bg-white p-5 shadow-4xl">
      <div className="mx-auto flex w-full items-center justify-center gap-4">
        <div className="flex w-20">
          <Image src={imageSrc} alt="donate_image" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-lg font-bold">{t(`${value}`)}</div>
          {buttonLabel && buttonLink && (
            <Button type="default" href={buttonLink}>
              {buttonLabel}
              <ArrowRightOutlined className="text-xs" />
            </Button>
          )}
        </div>
      </div>
      <div className="border-b border-b-gray-30" />
      <div className="mx-auto flex w-full justify-center whitespace-pre-wrap text-wrap">
        {content}
      </div>
    </div>
  );
}

export default DonateMethodCard;
