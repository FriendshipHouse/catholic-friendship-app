'use client';

import { Dispatch, SetStateAction } from 'react';

import { Modal } from 'antd';
import Image from 'next/image';

import lineIdImage from '@/../public/general/img-lineId-cana.png';

type LineModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function LineModal({ open, setOpen }: Readonly<LineModalProps>) {
  return (
    <Modal
      open={open}
      footer={null}
      title={<div className="text-lg font-bold">愛在加納LINE ID</div>}
      onCancel={() => setOpen(false)}
      destroyOnClose
      className="flex flex-col justify-center items-center"
    >
      <Image src={lineIdImage} alt="lineIdImage" className="w-40" />
    </Modal>
  );
}

export default LineModal;
