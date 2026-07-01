'use client';

import React from 'react';

import { DownloadOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import TitleHighlight from '@/components/TitleHighlight';

import prayers from '@/data/prayers.json';
import { Link, usePathname, useRouter } from '@/i18n/routing';

const downloadImage = async (src: string, label: string) => {
  const response = await fetch(src);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${label}.png`;
  a.click();

  URL.revokeObjectURL(url);
};

function PrayerIdPage() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('prayer');

  const prayerID = pathname?.split('/').at(-1);

  const allContents = prayers.flatMap((categoryObj) => categoryObj.content);
  const currentContent = allContents.find((content) => content.id === prayerID);

  if (!currentContent) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-grey-80 font-bold">找不到此文章(ID: {prayerID})，或文章已被移除。</p>
        <Button onClick={() => router.push('/cana/prayer')} className="w-fit">
          返回列表
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:gap-6 gap-4">
      <div className="flex flex-col gap-4 sm:gap-10">
        <div className="flex flex-wrap gap-4 items-end sm:flex-row">
          <Link href={'/cana/prayer'}>
            <LeftCircleOutlined className="text-3xl" />
          </Link>
          <TitleHighlight>{currentContent.label}</TitleHighlight>
        </div>
        <div className="border-b border-primary-30" />
      </div>

      <div className="flex flex-wrap md:flex-row my-10 gap-6 items-center justify-center">
        {currentContent.imageCount.map((imageId) => {
          const src = `/prayer/prayer/img_${currentContent.id}_${imageId}.png`;
          const label = `${currentContent.label}_${imageId}`;

          return (
            <div key={imageId} className="flex flex-col gap-2 justify-center">
              <Image
                src={src}
                alt={`${currentContent.label} - ${imageId}`}
                width={400}
                height={400}
                className="max-w-[600px] h-auto rounded-md"
              />
              <Button
                icon={<DownloadOutlined />}
                onClick={() => downloadImage(src, label)}
                className="!text-xs"
              >
                {t('download')}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PrayerIdPage;
