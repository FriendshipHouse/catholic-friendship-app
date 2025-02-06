'use client';

import { Dispatch, SetStateAction } from 'react';

import { Modal } from 'antd';
import { useTranslations } from 'next-intl';

type LineModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function LineModal({ open, setOpen }: Readonly<LineModalProps>) {
  const t = useTranslations();

  return (
    <Modal
      open={open}
      footer={null}
      title={<div>{t('footer.line')}</div>}
      onCancel={() => setOpen(false)}
      destroyOnClose
      className="flex flex-col justify-center items-center"
    >
      <div className="font-bold text-xl py-8 pl-6 pr-10">LOVECANA2015</div>
    </Modal>
  );
}

export default LineModal;
