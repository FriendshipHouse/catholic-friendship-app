'use client';

import React, { useMemo } from 'react';

import { Button, Modal } from 'antd';
import dayjs from 'dayjs';
import { useAtom, useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRightShort, ClockFill, GeoAltFill } from 'react-bootstrap-icons';

import BreadcrumbGroup from '@/components/BreadcrumbGroup';
import DateFormat from '@/components/DateFormat';
import TitleHighlight from '@/components/TitleHighlight';

import useImages from '@/hooks/useImages';
import { INITIAL_ACTIVITY_VALUE, activityModal } from '@/jotai/activityModal';
import { loginModal } from '@/jotai/loginModal';
import {
  INITIAL_REGISTER_ACTIVITY_VALUE,
  registerActivityModal,
} from '@/jotai/registerActivityModal';

import LoginModal from '../LoginModal';
import RegisterActivityFormModal from './RegisterActivityFormModal';

function ActivityModal() {
  const t = useTranslations();

  const [modalState, setModalState] = useAtom(activityModal);
  const setOpenRegisterModal = useSetAtom(registerActivityModal);
  const setOpenLoginModal = useSetAtom(loginModal);

  const { data: activityImages = [] } = useImages('activities/images');
  const {
    name,
    date,
    time,
    location,
    description,
    image,
    registerType,
    googleFormLink = '',
    systemFormInfo,
  } = modalState?.activityData ?? {};

  const { status } = useSession();
  const isLogin = status === 'authenticated';

  const onRegisterClick = () => {
    if (registerType === 'google' && googleFormLink && window?.open) {
      window.open(googleFormLink, '_blank');
      return;
    }

    if (!isLogin) {
      setOpenLoginModal(true);
    }

    if (isLogin) {
      setOpenRegisterModal({
        open: true,
        registerFormValue: INITIAL_REGISTER_ACTIVITY_VALUE,
      });
    }
  };

  const { url = '' } =
    activityImages.find((imageInfo) => {
      const filename = (imageInfo?.pathname ?? '').split('/').pop();
      return filename === image;
    }) ?? {};

  const isRegistrationShow = useMemo(() => {
    const isGoogleForm = registerType === 'google' && googleFormLink?.startsWith('https://');
    const isSystemForm = registerType === 'system';

    if (typeof date === 'string') {
      const beforeToday = dayjs().isBefore(dayjs(`${date}`), 'day');

      if (isGoogleForm && beforeToday) return true;

      if (isSystemForm && systemFormInfo?.dueDate) {
        const { dueDate } = systemFormInfo;

        const dueDateReference = {
          day: dayjs(date),
          week: dayjs(date).subtract(1, 'week'),
          month: dayjs(date).subtract(1, 'month'),
        };

        if (dueDate === 'day' || dueDate === 'week' || dueDate === 'month') {
          const dateValidation = dueDate && dayjs().isBefore(dueDateReference[dueDate], 'day');
          return dateValidation;
        }
      }
    }
    return false;
  }, [registerType, googleFormLink, date, systemFormInfo]);

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
          {isRegistrationShow && (
            <Button type="link" className="!group !p-0 !text-gray-80" onClick={onRegisterClick}>
              <div className="flex w-fit flex-row items-center justify-center gap-2 rounded-lg border border-gray-40 px-4 py-1 text-sm font-bold hover:border-primary-40">
                {t('button.register')}
                <ArrowRightShort className="text-xl text-gray-50 hover:text-primary" />
              </div>
            </Button>
          )}
          <LoginModal />
          <RegisterActivityFormModal />
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
        <div className='sm:bg-primary-10 sm:border border-primary-30 rounded-md w-full'>
          <Image
            priority
            src={url}
            alt="Image"
            height={660}
            width={630}
            className="h-auto w-full rounded-md px-14"
            loading="eager"
            quality={100}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ActivityModal;
