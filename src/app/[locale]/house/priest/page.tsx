'use client';

import React from 'react';

import { Button, Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { useTranslations } from 'next-intl';

function Priest() {
  const t = useTranslations('housePriest');

  const video = (
    <div className="flex flex-wrap justify-between gap-4 md:grid md:grid-cols-2 md:gap-4">
      <div className="flex w-full flex-col gap-4">
        <div className="hidden font-semibold md:flex">{t('videoLife')}</div>
        <iframe
          className="w-full rounded-lg sm:flex"
          width="500"
          height="300"
          src="https://www.youtube.com/embed/iv3ICK-YRK8"
          title="歐義明神父 追思影片"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="hidden font-semibold md:flex">{t('videoMass')}</div>
        <iframe
          className="w-full rounded-lg sm:flex"
          width="500"
          height="300"
          src="https://www.youtube.com/embed/qneftUwQyTE"
          title="“神秘嘉賓”參加「歐義明神父逝世一週年追思會」"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );

  const lifeStoryItem: CollapseProps['items'] = [
    {
      key: 'lifeStory',
      label: (
        <div className="text-lg font-bold text-gray-80 hover:text-gray-60">
          {t('lifeStoryTitle')}
        </div>
      ),
      children: <p className="whitespace-pre-wrap">{t('lifeStoryContent')}</p>,
    },
  ];

  const videoItem: CollapseProps['items'] = [
    {
      key: 'video',
      label: (
        <div className="text-lg font-bold text-gray-80 hover:text-gray-60">{t('videoTitle')}</div>
      ),
      children: video,
    },
  ];

  const bookButtonList = [
    {
      value: 'BookPriest',
      url: 'https://drive.google.com/file/d/1ZsgRTJMZ8rsoB9x8U7S0XC7RIVfyNWZz/view',
    },
    {
      value: 'BookElder',
      url: 'https://drive.google.com/file/d/1TbCclPbL2okwhfLRCyCdpl6W59w63pxT/view',
    },
    {
      value: 'BookYouth',
      url: 'https://drive.google.com/file/d/1DkTQiFAMr6ijb3HKjhwchvkV_afVdx2g/view',
    },
    {
      value: 'BookColleague',
      url: 'https://drive.google.com/file/d/1notddh_mi3iSoXHDIpzNTntqt-qZUzlY/view',
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 leading-6 whitespace-pre-wrap">
        <div className="text-lg font-bold">{t('priest')}</div>
        <p className="text-md">{t('briefIntro')}</p>
        <div className="w-full border-t border-solid border-primary-30" />

        <div className="hidden gap-4 md:flex md:flex-col">
          <div className="text-lg font-bold">{t('lifeStoryTitle')}</div>
          <p>{t('lifeStoryContent')}</p>
          <div className="w-full border-t border-solid border-primary-30" />
          <div className="text-lg font-bold">{t('videoTitle')}</div>
          {video}
        </div>

        <div className="flex flex-col gap-2 md:hidden">
          <Collapse
            items={lifeStoryItem}
            ghost={true}
            expandIconPosition="end"
            className="[&_.ant-collapse-header]:!pl-0"
          />
          <div className="w-full border-t border-solid border-primary-30" />
          <Collapse
            items={videoItem}
            ghost={true}
            expandIconPosition="end"
            className="[&_.ant-collapse-header]:!pl-0"
          />
        </div>

        <div className="w-full border-t border-solid border-primary-30" />
        <div className="text-lg font-bold">{t('bookTitle')}</div>
        <div className="flex flex-col items-start gap-x-4 gap-y-2 md:min-w-[400px] md:flex-row">
          {bookButtonList.map(({ value, url }) => {
            return (
              <Button
                type="default"
                key={value}
                href={url}
                target="_blank"
                className="!w-full !text-wrap !bg-white/20 !shadow-4xl !backdrop-blur"
              >
                {t(value)}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Priest;
