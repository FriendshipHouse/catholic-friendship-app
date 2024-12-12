'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  ArrowDownShort,
  ArrowLeftShort,
  ArrowRightShort,
  ArrowUpShort,
} from 'react-bootstrap-icons';

import TitleHighlight from '@/components/TitleHighlight';
import IndexButton from '@/components/index/IndexButton';
import Background from '@/components/layout/Background';

import imageDance from '@/../public/general/img-dance.png';

function ManagementIndex() {
  const t = useTranslations('');
  const buttonList = [
    { value: 'categoriesManage' },
    { value: 'eventsManage' },
    { value: 'activitiesManage' },
    { value: 'registerManage' },
  ];

  return (
    <div className="relative flex h-full w-full">
      <Background />
      <div className="relative z-10 m-auto flex max-w-screen-lg items-center justify-center">
        <div className="mb:px-5 flex w-screen items-center justify-between px-10">
          <div className="flex flex-col gap-12">
            <div className="flex text-3xl text-gray-40 md:text-4xl md:text-gray-40">
              <ArrowUpShort />
              <ArrowDownShort />
              <ArrowLeftShort />
              <ArrowRightShort />
            </div>
            <div>
              <TitleHighlight>{t('account.managePage')}</TitleHighlight>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex max-w-md flex-wrap gap-4 md:max-w-xl md:gap-5">
                {buttonList.map(({ value }) => (
                  <IndexButton key={value} pathname={`/management/system/${value}`}>
                    {t(`management.${value}`)}
                  </IndexButton>
                ))}
                <div className="w-full border-b border-b-gray-30" />
                <IndexButton key="adminsManage" pathname={`/management/system/adminsManage`}>
                  {t(`management.adminsManage`)}
                </IndexButton>
              </div>
            </div>
          </div>
          <div className="hidden md:flex">
            <Image src={imageDance} alt="imageDance" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagementIndex;
