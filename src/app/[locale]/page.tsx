'use client';

import { useEffect, useState } from 'react';

import { Modal } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  ArrowDownShort,
  ArrowLeftShort,
  ArrowRightShort,
  ArrowUpShort,
} from 'react-bootstrap-icons';

import TitleHighlight from '@/components/TitleHighlight';
import FloatButton from '@/components/index/FloatButton';
import IndexButton from '@/components/index/IndexButton';
import Background from '@/components/layout/Background';

import imageJesus from '@/../public/general/img-index.png';

type NotificationModalProps = {
  open: boolean,
  onCancel: () => void,
}

function NotificationModal({ open, onCancel }: Readonly<NotificationModalProps>) {

  return (
    <Modal
      open={open}
      footer={null}
      title={<div className="font-bold">我們搬家囉~</div>}
      onCancel={onCancel}
      destroyOnClose
    >
      <div>{`教友中心搬家搬至"同安街聖若瑟天主堂"，歡迎來找我們玩玩~`}</div>
    </Modal>
  )
}

export default function Index() {
  const t = useTranslations();

  const [openNotification, setOpenNotification] = useState(false)

  useEffect(() => { setOpenNotification(true) }, [])

  const themeButtonList = [
    { value: 'about', pathname: '/house/about' },
    { value: 'cana', pathname: '/cana' },
    { value: 'events', pathname: '/events/activities' },
    { value: 'upcoming', pathname: '/upcoming' },
  ];

  return (
    <div className="relative w-full">
      <NotificationModal open={openNotification} onCancel={() => setOpenNotification(false)} />
      <FloatButton />
      <Background />
      <div className="fixed z-0 flex h-full w-full items-center justify-center opacity-20 md:hidden">
        <Image src={imageJesus} alt="imageJesus" />
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-screen-lg items-center justify-center">
        <div className="mb:px-5 flex w-screen items-center justify-between px-10">
          <div className="flex flex-col gap-12">
            <div className="flex text-3xl text-gray-40 md:text-4xl md:text-gray-40">
              <ArrowUpShort />
              <ArrowDownShort />
              <ArrowLeftShort />
              <ArrowRightShort />
            </div>
            <div>
              <div className="flex flex-col flex-wrap gap-2 sm:gap-4">
                <TitleHighlight>{t('index.title1')}</TitleHighlight>
                <TitleHighlight>{t('index.title2')}</TitleHighlight>
                <TitleHighlight>{t('index.title3')}</TitleHighlight>
              </div>
            </div>
            <div className="flex max-w-md flex-wrap gap-4 md:max-w-xl md:gap-5">
              {themeButtonList.map(({ value, pathname }) => (
                <IndexButton key={value} pathname={pathname}>
                  {t(`pathname.${value}`)}
                </IndexButton>
              ))}
            </div>
          </div>
          <div className="hidden h-2/3 md:flex">
            <Image src={imageJesus} alt="imageJesus" />
          </div>
        </div>
      </div>
    </div>
  );
}
