'use client';

import { useState } from 'react';

import { App, Button, Popconfirm } from 'antd';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import useActivities from '@/hooks/useActivities';
import { usePathname } from '@/i18n/routing';
import { activitySelectionRows } from '@/jotai/managementActivity';

function BatchRemoveActivitiesButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categoryId = searchParams.get('categoryId');
  const eventId = searchParams.get('eventId');

  const { message } = App.useApp();
  const t = useTranslations();
  const { mutate } = useActivities(categoryId, eventId);

  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [selectionRows, setSelectionRows] = useAtom(activitySelectionRows);

  const isShow = pathname.includes('activitiesManage');

  const handleDelete = async () => {
    if (selectionRows?.length === 0) {
      return;
    }

    setIsFetchLoading(true);
    try {
      await axios.delete('/api/activities', { data: selectionRows });
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
        title={t('activities.popConfirmTitle')}
        description={t('activities.popConfirmAllDescription')}
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

export default BatchRemoveActivitiesButton;
