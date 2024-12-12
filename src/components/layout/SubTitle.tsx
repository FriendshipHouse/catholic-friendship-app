'use client';

import { Button } from 'antd';
import { useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { ArrowRightShort } from 'react-bootstrap-icons';

import BreadcrumbGroup from '@/components/BreadcrumbGroup';
import TitleHighlight from '@/components/TitleHighlight';

import { loginModal } from '@/jotai/loginModal';
import { INITIAL_REGISTER_EVENT_VALUE, registerEventModal } from '@/jotai/registerEventModal';

export type SubTitleProps = {
  title: string | React.ReactNode;
  buttonLabel?: string | React.ReactNode;
  isActivity?: boolean;
  pathname?: string;
  isModal?: boolean;
};

function SubTitle({ title, buttonLabel, isActivity, pathname, isModal }: Readonly<SubTitleProps>) {
  const setRegisterEventModalOpen = useSetAtom(registerEventModal);
  const setOpenLoginModal = useSetAtom(loginModal);

  const { status } = useSession();
  const isLogin = status === 'authenticated';

  const onClick = () => {
    if (pathname && window?.open()) {
      window.open(pathname, '_blank');
    }
    if (!isLogin) {
      setOpenLoginModal(true);
    }
    if (isModal && isLogin) {
      setRegisterEventModalOpen({ open: true, registerFormValue: INITIAL_REGISTER_EVENT_VALUE });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <BreadcrumbGroup />
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-10">
          <TitleHighlight>{title}</TitleHighlight>
          {isActivity && (
            <Button type="link" className="!group !p-0 !text-gray-80" onClick={onClick}>
              <div className="flex w-fit flex-row items-center justify-center gap-2 rounded-lg border border-gray-40 px-4 py-1 text-sm font-bold hover:border-primary-40">
                {buttonLabel}
                <ArrowRightShort className="text-xl text-gray-50 hover:text-primary" />
              </div>
            </Button>
          )}
        </div>
      </div>
      <div className="border-b border-primary-30"></div>
    </div>
  );
}

export default SubTitle;
