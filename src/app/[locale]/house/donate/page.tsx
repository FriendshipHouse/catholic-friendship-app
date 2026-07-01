'use client';

import { useCallback, useEffect, useState } from 'react';

import { DoubleRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import debounce from 'lodash/debounce';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import DonateMethodCard from '@/components/house/donate/DonateMethodCard';

import iconActivity from '@/../public/about/donate/icon-activity.svg';
import iconApostle from '@/../public/about/donate/icon-apostle.svg';
import iconIntroduce from '@/../public/about/donate/icon-introduce.svg';
import iconMaterial from '@/../public/about/donate/icon-material.svg';
import iconWeb from '@/../public/about/donate/icon-web.svg';
import imageAllocate from '@/../public/about/img-donate-allocate.png';
import imageCash from '@/../public/about/img-donate-cash.png';
import imageCounterTransfer from '@/../public/about/img-donate-counterTransfer.png';
import imageCreditCard from '@/../public/about/img-donate-creditCard.png';
import imageOnlinePay from '@/../public/about/img-donate-onlinePay.png';

const donateButtonList = [
  {
    value: 'creditCard',
    imageSrc: imageCreditCard,
    content: 'creditCardContent',
    buttonLabel: 'creditCardButton',
    buttonLink: 'https://core.newebpay.com/Period/friendho/of35U0',
  },
  {
    value: 'onlinePay',
    imageSrc: imageOnlinePay,
    content: 'onlinePayContent',
    buttonLabel: 'onlinePayButton',
    buttonLink: 'https://core.newebpay.com/EPG/friendho/GXrl4D',
  },
  {
    value: 'counterTransfer',
    imageSrc: imageCounterTransfer,
    content: 'counterTransferContent',
  },
  {
    value: 'cash',
    imageSrc: imageCash,
    content: 'cashContent',
  },
  {
    value: 'allocate',
    imageSrc: imageAllocate,
    content: 'allocateContent',
  },
];

const resultList = [
  { key: 'service1', icon: iconWeb },
  { key: 'service2', icon: iconActivity },
  { key: 'service3', icon: iconApostle },
  { key: 'service4', icon: iconMaterial },
  { key: 'service5', icon: iconIntroduce },
];

function Donate() {
  const t = useTranslations('houseDonate');

  const [open, setOpen] = useState(false);
  const [isShowMoreInfo, setIsShowMoreInfo] = useState(true);

  const onRelayout = useCallback(() => {
    const windowWidth = window.innerWidth;
    if (!open && windowWidth < 768) {
      setIsShowMoreInfo(false);
      setOpen(true);
      return;
    }

    if (open && windowWidth >= 768) {
      setIsShowMoreInfo(true);
      setOpen(false);
    }
  }, [open]);

  const debounceResize = debounce(onRelayout, 300);

  useEffect(() => {
    debounceResize();
    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, [debounceResize]);

  const readMoreContent = (
    <div className="flex flex-col gap-6">
      <p className="font-bold">{t('marriageAndReligion')}</p>
      <div className="whitespace-pre-wrap leading-6">{t('content')}</div>
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-6 whitespace-pre-wrap leading-6">
        <p className="">{t('description')}</p>
      </div>
      {open && !isShowMoreInfo && (
        <Button
          type="default"
          className="!w-fit md:!hidden"
          onClick={() => setIsShowMoreInfo(true)}
        >
          {t('readMore')}
          <DoubleRightOutlined className="text-[10px]" />
          {t('marriageAndReligion')}
        </Button>
      )}

      {isShowMoreInfo && readMoreContent}

      <div className="flex flex-col gap-6">
        <p className="font-bold">{t('result')}</p>
        <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start sm:items-start sm:gap-4">
          {resultList.map(({ key, icon }) => (
            <div
              key={key}
              className="flex flex-col items-center justify-start gap-3 text-center w-28 sm:max-w-28"
            >
              <Image
                src={icon}
                alt={t(`resultContent.${key}`)}
                width={56}
                height={56}
                className="h-18 w-18 sm:h-14 sm:w-14"
              />
              <p className="text-sm text-grey-70">{t(`resultContent.${key}`)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-b-primary-40" />
      <div className="mx-auto grid w-full flex-wrap gap-5 md:grid-cols-2">
        {donateButtonList.map(({ value, imageSrc, content, buttonLabel, buttonLink }) => (
          <DonateMethodCard
            key={value}
            value={value}
            imageSrc={imageSrc}
            content={content}
            buttonLabel={buttonLabel}
            buttonLink={buttonLink}
          />
        ))}
      </div>
    </div>
  );
}

export default Donate;
