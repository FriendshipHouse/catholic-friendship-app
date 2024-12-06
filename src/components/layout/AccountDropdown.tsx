'use client';

/* eslint-disable @next/next/no-img-element */
import { Button, Popover, Spin } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { BoxArrowRight, PencilSquare, PersonCircle, PersonVcard } from 'react-bootstrap-icons';

import useAdmins from '@/hooks/useAdmins';
import { useRouter } from '@/i18n/routing';

function UserInformation() {
  const { data: session } = useSession();
  const { name, image: avatar, email } = session?.user ?? {};
  const { data: admins = [], isLoading: isAdminsLoading } = useAdmins();
  const t = useTranslations('account');
  const router = useRouter();

  const isAdminAccount = !isAdminsLoading && admins.some((admin) => admin.email === email);

  const buttonContent = [
    {
      value: 'user',
      pathname: '/user',
      icon: <PersonVcard />,
    },
    {
      value: 'managePage',
      pathname: '/management/index',
      icon: <PencilSquare />,
    },
  ];

  return (
    <div className="m-1 flex flex-col items-center justify-center">
      <Spin spinning={isAdminsLoading}>
        <div className="flex flex-col items-center gap-1 border-b border-gray-30 p-3 text-center">
          <img src={avatar ?? ''} alt="avatar" className="h-12 w-12 overflow-hidden rounded-full" />
          <div className="text-[16px] font-bold">{name}</div>
          <div className="text-gray-60">{email}</div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-col items-start gap-3 border-b border-gray-30 py-3">
            {(isAdminAccount ? buttonContent : [buttonContent[0]]).map(
              ({ value, pathname, icon }) => (
                <div
                  key={value}
                  className="mx-auto flex w-full max-w-36 items-center justify-center gap-2"
                >
                  <Button
                    type="link"
                    onClick={() => router.push({ pathname })}
                    className="darkGrayLink !w-full !justify-start"
                  >
                    <div className="w-4">{icon}</div>
                    {t(value)}
                  </Button>
                </div>
              )
            )}
          </div>
          <div className="mx-auto flex w-full max-w-36 items-center justify-center gap-2">
            <Button
              type="link"
              onClick={() => signOut()}
              className="darkGrayLink !w-full !justify-start"
            >
              <BoxArrowRight />
              <div>{t('signOut')}</div>
            </Button>
          </div>
        </div>
      </Spin>
    </div>
  );
}

function AccountDropdown() {
  const { data: session, status } = useSession();
  const isLogin = status === 'authenticated';
  const { name, image: avatar } = session?.user ?? {};
  const t = useTranslations('account');

  return (
    <div className="flex items-center">
      {isLogin && avatar ? (
        <Popover
          content={<UserInformation />}
          trigger="click"
          className="flex w-full cursor-pointer items-center gap-1"
          arrow={false}
          overlayClassName="!pt-5"
        >
          <Button type="link" className="headerLink !p-0 !font-semibold">
            <img
              src={avatar}
              alt="avatar"
              className="h-4 w-4 overflow-hidden rounded-full lg:h-[20px] lg:w-[20px]"
            />
            <div className="hidden lg:flex">{name}</div>
          </Button>
        </Popover>
      ) : (
        <Button
          type="link"
          icon={<PersonCircle className="text-sm lg:text-[16px]" />}
          className="headerLink !p-0 !font-semibold"
          onClick={() => signIn('google')}
        >
          {t('signIn')}
        </Button>
      )}
    </div>
  );
}

export default AccountDropdown;
