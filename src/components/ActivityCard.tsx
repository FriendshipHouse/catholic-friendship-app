'use client';

import { Card, Empty } from 'antd';
import { useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ClockFill, GeoAltFill } from 'react-bootstrap-icons';

import DateFormat from '@/components/DateFormat';

import useImages from '@/hooks/useImages';
import { activityModal } from '@/jotai/activityModal';

type ActivityCardType = {
  activities: ActivitiesFormValue[];
  isLoading: boolean;
};

function ActivityCard({ activities, isLoading }: Readonly<ActivityCardType>) {
  const t = useTranslations();
  const setOpenModal = useSetAtom(activityModal);

  const { Meta } = Card;

  const { data: activityImages = [], isLoading: activityImagesIsLoading } =
    useImages('activities/images');

  const activitiesEmpty = !isLoading && (!activities || activities.length === 0);

  return activitiesEmpty ? (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={t('emptyText.upcoming')}
      className="border-b border-b-primary-30 pb-10 pt-2"
    />
  ) : (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {activities.map((activityData) => {
        const { _id, image, date, name, time, location } = activityData ?? {};

        const { url = '' } =
          activityImages.find((imageInfo) => {
            const filename = (imageInfo?.pathname ?? '').split('/').pop();
            return filename === image;
          }) ?? {};
        const selectedData = activities.find((item) => item._id === _id)!;

        return (
          <Card
            key={_id}
            hoverable
            cover={
              <div className="h-52 w-full items-center overflow-hidden">
                <Image
                  src={url}
                  alt={image}
                  width={300}
                  height="0"
                  className="flex min-h-64 w-full items-center sm:min-h-52"
                  loading="lazy"
                />
              </div>
            }
            loading={isLoading || activityImagesIsLoading}
            onClick={() => {
              setOpenModal({ open: true, activityData: selectedData });
            }}
          >
            <Meta
              title={
                <div className="flex flex-col gap-3">
                  <DateFormat date={date} isTableList={true} />
                  <div className="text-wrap text-lg font-bold">{name}</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="text-primary">
                        <ClockFill />
                      </div>
                      <div>{time.join(' - ')}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-primary">
                        <GeoAltFill />
                      </div>
                      <div className="text-wrap">{location}</div>
                    </div>
                  </div>
                </div>
              }
            />
          </Card>
        );
      })}
    </div>
  );
}

export default ActivityCard;
