'use client';

import React from 'react';

import { Modal } from 'antd';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ClockFill, GeoAltFill } from 'react-bootstrap-icons';

import BreadcrumbGroup from '@/components/BreadcrumbGroup';
import DateFormat from '@/components/DateFormat';
import TitleHighlight from '@/components/TitleHighlight';

import useImages from '@/hooks/useImages';
import { INITIAL_ACTIVITY_VALUE, activityModal } from '@/jotai/activityModal';

function MyRegistrationModal() {
  const t = useTranslations();

  const [modalState, setModalState] = useAtom(activityModal);

  const { data: activityImages = [] } = useImages('activities/images');
  const { name, date, time, location, description, image, systemFormInfo } =
    modalState?.activityData ?? {};

  const { url = '/general/img-empty.png' } =
    activityImages.find((imageInfo) => {
      const filename = (imageInfo?.pathname ?? '').split('/').pop();
      return filename === image;
    }) ?? {};

  return (
    <Modal
      open={modalState.open}
      width={700}
      footer={null}
      onCancel={() =>
        setModalState((prev) => ({ ...prev, open: false, activityData: INITIAL_ACTIVITY_VALUE }))
      }
    >
      <div className="flex flex-col gap-8 p-3">
        <BreadcrumbGroup />
        <div className="flex flex-col items-start gap-5">
          <TitleHighlight>{name}</TitleHighlight>
        </div>
        <div className="border-b border-primary-30" />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
          <div className="hidden sm:flex">
            <DateFormat date={date} isModal={true} />
          </div>
          <div className="flex sm:hidden [&_div]:text-xl [&_div]:font-bold">
            <DateFormat date={date} isTableList={true} />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-5">
            <div className="hidden sm:flex sm:text-gray-60">/</div>
            <div className="flex items-center gap-2">
              <div className="text-primary">
                <ClockFill />
              </div>
              <div className="text-base">{(time ?? []).join(' - ')}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-primary">
                <GeoAltFill />
              </div>
              <div>{location}</div>
            </div>
          </div>
        </div>
        <p className="whitespace-pre-wrap leading-6">{description}</p>
        <Image
          priority
          src={url}
          alt="Image"
          height="0"
          width={300}
          className="h-auto w-full"
          loading="eager"
        />
        {systemFormInfo?.detail && (
          <div className="flex flex-col gap-2">
            <div className="font-bold">{t('activities.registerDetail')}</div>
            <p className="whitespace-pre-wrap leading-6">{systemFormInfo?.detail}</p>
          </div>
        )}
        {systemFormInfo?.notice && (
          <div className="flex flex-col gap-2">
            <div className="font-bold">{t('activities.registerNotice')}</div>
            <p className="whitespace-pre-wrap leading-6">{systemFormInfo?.notice}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default MyRegistrationModal;
