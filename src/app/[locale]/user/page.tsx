'use client';

import { useEffect, useState } from 'react';

import { Button, Empty, Table, Tabs } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { ClockFill, GeoAltFill } from 'react-bootstrap-icons';

import DateFormat from '@/components/DateFormat';
import MyRegistrationModal from '@/components/user/MyRegistrationModal';

import useMyRegistrations, { MyRegistration } from '@/hooks/useMyRegistrations';
import { Link } from '@/i18n/routing';
import { activityModal } from '@/jotai/activityModal';

function User() {
  const t = useTranslations();

  const [activities, setActivities] = useState<ActivitiesFormValue[]>([]);
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);

  const setOpenModal = useSetAtom(activityModal);

  const { data: session } = useSession();
  const { name, email } = session?.user ?? {};

  const { data: myRegistrations = [], isLoading: isMyRegistrationLoading } = useMyRegistrations();

  useEffect(() => {
    const fetchActivities = async () => {
      if (myRegistrations.length === 0) return;
      setIsActivitiesLoading(true);

      try {
        const results = await Promise.all(
          myRegistrations.map(({ categoryId, eventId }) =>
            axios
              .get('/api/activities', { params: { categoryId, eventId } })
              .then((res) => res.data)
          )
        );
        setActivities(results);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setIsActivitiesLoading(false);
      }
    };

    fetchActivities();
  }, [myRegistrations]);

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
      sorter: (a: { date: string }, b: { date: string }) =>
        dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
    },
    {
      key: 'activityName',
      dataIndex: 'activityName',
      render: (_: string, data: MyRegistration) => {
        return <div className="cursor-default">{data.activityName}</div>;
      },
      sorter: (a: { activityName: string }, b: { activityName: any }) =>
        a.activityName.localeCompare(b.activityName),
    },
    {
      key: 'time',
      dataIndex: 'time',
      render: (_: string[], data: MyRegistration) => {
        return (
          <div className="hidden items-center md:flex md:gap-2">
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
          <div className="hidden items-center md:flex md:gap-2">
            <div className="text-primary">
              <GeoAltFill />
            </div>
            <div>{data.location}</div>
          </div>
        );
      },
    },
  ];

  const tableDataSource = myRegistrations.map((item) => ({ ...item, key: item._id }));

  const onRowForModal = (MyRegistration: MyRegistration) => {
    const { activityId } = MyRegistration;
    const activityModalData = activities.flat().find((data) => data._id === activityId);

    return {
      onClick: () => {
        if (!activityModalData) return;

        return setOpenModal({ open: true, activityData: activityModalData });
      },
      style: { cursor: 'pointer' },
    };
  };

  return (
    <div className="flex h-full flex-col gap-6 md:flex-row md:gap-10">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">{t('user.account')}</div>
        <div className="flex w-fit min-w-32 flex-col gap-2">
          <div className="font-bold">{name}</div>
          <div>{email}</div>
        </div>
      </div>
      <div className="border-b border-primary-30 md:border-r" />
      <div className="flex w-full flex-col gap-2">
        <div className="text-lg font-bold">{t('user.myActivities')}</div>
        <div className="relative flex w-full flex-col">
          <Tabs items={tabItems} className="[&>.ant-tabs-nav]:!mb-0" />
          <Table
            dataSource={tableDataSource}
            loading={isMyRegistrationLoading || isActivitiesLoading}
            columns={columns}
            size="small"
            showHeader={false}
            onRow={(data) => onRowForModal(data)}
            locale={{
              emptyText: (
                <div className="flex flex-col items-center gap-2 p-5">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={t('user.noActivities')}
                    className="!m-0"
                  />
                  <Button type="primary" className="w-auto">
                    <Link href="/upcoming">{t('user.recentButton')}</Link>
                  </Button>
                </div>
              ),
            }}
            className="[&_.ant-table-cell:nth-child(3),&_.ant-table-cell:nth-child(4)]:!hidden md:[&_.ant-table-cell:nth-child(3),&_.ant-table-cell:nth-child(4)]:!flex"
          />
          <MyRegistrationModal />
        </div>
      </div>
    </div>
  );
}

export default User;
