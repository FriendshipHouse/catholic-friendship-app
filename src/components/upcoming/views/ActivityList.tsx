'use client';

import { Empty, Table } from 'antd';
import { useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { ClockFill, GeoAltFill } from 'react-bootstrap-icons';

import DateFormat from '@/components/DateFormat';

import { activityModal } from '@/jotai/activityModal';

type ActivityListType = {
  activities: ActivitiesFormValue[];
  isLoading: boolean;
};

function ActivityList({ activities, isLoading }: Readonly<ActivityListType>) {
  const t = useTranslations();

  const setOpenModal = useSetAtom(activityModal);

  const columns = [
    {
      key: 'dateNode',
      dataIndex: 'dateNode',
      render: (_: any, data: any) => {
        return <DateFormat date={data.date} isTableList={true} />;
      },
    },
    {
      key: 'name',
      dataIndex: 'name',
    },
    {
      key: 'time',
      dataIndex: 'time',
      render: (_: any, data: any) => {
        return (
          <div className="hidden items-center sm:flex sm:gap-2">
            <div className="text-primary">
              <ClockFill />
            </div>
            <div>{data.time.join(' - ')}</div>
          </div>
        );
      },
    },
    {
      key: 'location',
      dataIndex: 'location',
      render: (_: any, data: any) => {
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

  const onRowForModal = (activityData: ActivitiesFormValue) => {
    return {
      onClick: () => {
        setOpenModal({ open: true, activityData });
      },
      style: { cursor: 'pointer' },
    };
  };

  const activitiesData = activities.map((activities) => ({ ...activities, key: activities._id }));

  return (
    <div className="flex flex-col gap-4">
      <Table
        dataSource={activitiesData}
        columns={columns}
        size="small"
        showHeader={false}
        locale={{
          emptyText: (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('emptyText.upcoming')} />
          ),
        }}
        loading={isLoading}
        onRow={(data) => onRowForModal(data)}
        className="[&_.ant-table-cell:nth-child(3),&_.ant-table-cell:nth-child(4)]:!hidden sm:[&_.ant-table-cell:nth-child(3),&_.ant-table-cell:nth-child(4)]:!flex"
      />
    </div>
  );
}

export default ActivityList;
