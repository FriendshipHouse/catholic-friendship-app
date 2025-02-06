'use client';

import { useCallback, useEffect, useState } from 'react';

import { DoubleRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import debounce from 'lodash/debounce';
import { useTranslations } from 'next-intl';

import DonateMethodCard from '@/components/house/donate/DonateMethodCard';
import DonatePieChart from '@/components/house/donate/DonatePieChart';

import imageAllocate from '@/../public/about/img-donate-allocate.png';
import imageCash from '@/../public/about/img-donate-cash.png';
import imageCounterTransfer from '@/../public/about/img-donate-counterTransfer.png';
import imageCreditCard from '@/../public/about/img-donate-creditCard.png';
import imageOnlinePay from '@/../public/about/img-donate-onlinePay.png';
import imageDonatePie1 from '@/../public/about/img-donate-pie1.png';
import imageDonatePie2 from '@/../public/about/img-donate-pie2.png';
import imageDonatePie3 from '@/../public/about/img-donate-pie3.png';
import imageDonatePie4 from '@/../public/about/img-donate-pie4.png';

const donatePieList = [
  {
    value: '1',
    title1: 'religionFamily',
    title2: 'highParticipation',
    pieSrc: imageDonatePie1,
    percentage1: 'pie11',
    percentage2: 'pie12',
  },
  {
    value: '2',
    title1: 'nonReligionFamily',
    title2: 'lowParticipation',
    pieSrc: imageDonatePie2,
    percentage1: 'pie21',
    percentage2: 'pie22',
  },
  {
    value: '3',
    title1: 'religionFamily',
    title2: 'under14',
    pieSrc: imageDonatePie3,
    percentage1: 'pie31',
    percentage2: 'pie32',
  },
  {
    value: '4',
    title1: 'nonReligionFamily',
    title2: 'under14',
    pieSrc: imageDonatePie4,
    percentage1: 'pie41',
    percentage2: 'pie42',
  },
];

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
      <p className="font-bold">{t('contentTitle')}</p>
      <div className="mx-auto my-4 grid w-full grid-cols-2 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-4">
        {donatePieList.map(({ value, title1, title2, pieSrc, percentage1, percentage2 }) => (
          <DonatePieChart
            key={value}
            value={value}
            title1={title1}
            title2={title2}
            pieSrc={pieSrc}
            percentage1={percentage1}
            percentage2={percentage2}
          />
        ))}
      </div>
      <div className="whitespace-pre-wrap leading-6">{t('content')}</div>
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-6 whitespace-pre-wrap leading-6">
        <p className="font-bold">{t('introTitle')}</p>
        <p>{t('introContent')}</p>
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
