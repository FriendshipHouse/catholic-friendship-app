'use client';

import { Button, Empty, Popover, Table, Tabs } from 'antd';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { ClockFill, GeoAltFill } from 'react-bootstrap-icons';

import DateFormat from '@/components/DateFormat';

import useMyRegistrations, { MyRegistration } from '@/hooks/useMyRegistrations';

function User() {
  const t = useTranslations();

  const { data: session } = useSession();
  const { name, email } = session?.user ?? {};

  const { data: myRegistrations = [], isLoading: isMyRegistrationLoading } = useMyRegistrations();

  const tabItems = [
    {
      key: 'comingActivities',
      label: t('user.comingActivities'),
    },
  ];

  const columns = [
    {
      key: 'date',
      dataIndex: 'date',
      render: (_: string, data: MyRegistration) => {
        return <DateFormat date={data.date} isTableList={true} />;
      },
    },
    {
      key: 'activityName',
      dataIndex: 'activityName',
      render: (_: string, data: MyRegistration) => {
        return data.systemFormInfo.notice ? (
          <Popover
            title={t('activities.registerNotice')}
            overlayStyle={{ width: '500px' }}
            content={data.systemFormInfo.notice}
            trigger="hover"
            placement="bottom"
          >
            <div>{data.activityName}</div>
          </Popover>
        ) : (
          <div>{data.activityName}</div>
        );
      },
    },
    {
      key: 'time',
      dataIndex: 'time',
      render: (_: string[], data: MyRegistration) => {
        return (
          <div className="hidden items-center sm:flex sm:gap-2">
            <div className="text-primary">
              <ClockFill />
            </div>
            <div>{data?.time?.join(' - ')}</div>
          </div>
        );
      },
    },
    {
      key: 'location',
      dataIndex: 'location',
      render: (_: string, data: MyRegistration) => {
        return (
          <div className="hidden items-center sm:flex sm:gap-2">
            <div className="text-primary">
              <GeoAltFill />
            </div>
            <div>{data.location}</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex h-full flex-col gap-6 sm:flex-row sm:gap-10">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">{t('user.account')}</div>
        <div className="flex w-fit min-w-32 flex-col gap-2">
          <div className="font-bold">{name}</div>
          <div>{email}</div>
        </div>
      </div>
      <div className="border-b border-primary-30 sm:border-r" />
      <div className="flex w-full flex-col gap-2">
        <div className="text-lg font-bold">{t('user.myActivities')}</div>
        <div className="relative flex w-full flex-col">
          <Tabs items={tabItems} className="[&>.ant-tabs-nav]:!mb-0" />
          <Table
            dataSource={myRegistrations}
            loading={isMyRegistrationLoading}
            columns={columns}
            size="small"
            showHeader={false}
            locale={{
              emptyText: (
                <div className="flex flex-col items-center gap-2 p-5">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={t('user.noActivities')}
                    className="!m-0"
                  />
                  <Button type="primary" href="/upcoming" className="w-auto">
                    {t('user.recentButton')}
                  </Button>
                </div>
              ),
            }}
            className="[&_.ant-table-cell:nth-child(3),&_.ant-table-cell:nth-child(4)]:!hidden sm:[&_.ant-table-cell:nth-child(3),&_.ant-table-cell:nth-child(4)]:!flex"
          />
        </div>
      </div>
    </div>
  );
}

export default User;
