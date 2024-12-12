'use client';

import { useState } from 'react';

import { App, Button, Popconfirm } from 'antd';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import useRegistrations from '@/hooks/useRegistrations';
import { usePathname } from '@/i18n/routing';
import { registrationSelectionRows } from '@/jotai/managementRegistration';

function BatchRemoveRegistrationsButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categoryId = searchParams.get('categoryId') ?? '';
  const eventId = searchParams.get('eventId') ?? '';

  const { message } = App.useApp();
  const t = useTranslations();

  const { mutate } = useRegistrations({ categoryId, eventId });

  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [selectionRows, setSelectionRows] = useAtom(registrationSelectionRows);

  const isShow = pathname.includes('registerManage');

  const handleDelete = async () => {
    if (selectionRows?.length === 0) {
      return;
    }

    setIsFetchLoading(true);
    try {
      await axios.delete('/api/registrations', { data: selectionRows });
      await mutate();

      message.success(t('toast.deleteSuccess'));
    } catch (error) {
      message.error(t('toast.deleteFailed'));
    }

    setIsFetchLoading(false);
    setSelectionRows([]);
  };

  return (
    isShow && (
      <Popconfirm
        placement="rightBottom"
        title="刪除報名表單"
        description="是否確認刪除所選取的報名表單?"
        onConfirm={handleDelete}
        okText={t('popConfirm.okButton')}
        cancelText={t('popConfirm.cancelButton')}
      >
        <Button
          type="primary"
          disabled={selectionRows?.length === 0}
          loading={isFetchLoading}
          danger
        >
          批次刪除
        </Button>
      </Popconfirm>
    )
  );
}

export default BatchRemoveRegistrationsButton;
