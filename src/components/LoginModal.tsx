'use client';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Popover } from 'antd';
import { useAtom } from 'jotai';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { loginModal } from '@/jotai/loginModal';

function LoginModal() {
  const t = useTranslations();

  const [openLoginModal, setOpenLoginModal] = useAtom(loginModal);

  return (
    <Modal
      open={openLoginModal}
      footer={null}
      title={<div className="text-lg font-bold">{t('register.title')}</div>}
      onCancel={() => {
        setOpenLoginModal(false);
      }}
      destroyOnClose
    >
      <div className="flex items-center gap-2">
        <Button
          type="primary"
          onClick={() => {
            signIn('google');
            setOpenLoginModal(false);
          }}
        >
          {t('register.loginGoogle')}
        </Button>
        <div>{t('register.loginDescription')}</div>
        <Popover
          title={t('register.loginPopTitle')}
          overlayStyle={{ width: '300px' }}
          content={t('register.loginPopDescription')}
          trigger="hover"
        >
          <div className="cursor-pointer text-xs text-gray-50">
            <QuestionCircleOutlined />
          </div>
        </Popover>
      </div>
    </Modal>
  );
}

export default LoginModal;
