'use client';

import { Dispatch, SetStateAction } from 'react';

import { Modal } from 'antd';

type LineModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function LineModal({ open, setOpen }: Readonly<LineModalProps>) {
  return (
    <Modal
      open={open}
      footer={null}
      title={<div>愛在加納LINE ID:</div>}
      onCancel={() => setOpen(false)}
      destroyOnClose
      className="flex flex-col justify-center items-center"
    >
      <div className='font-bold text-xl p-10'>LOVECANA2015</div>
    </Modal>
  );
}

export default LineModal;
