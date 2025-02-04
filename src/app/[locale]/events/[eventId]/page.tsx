'use client';

import { Spin } from 'antd';
import Image from 'next/image';

import ActivityCard from '@/components/ActivityCard';
import LoginModal from '@/components/LoginModal';
import ActivityModal from '@/components/activity/ActivityModal';
import RegisterEventFormModal from '@/components/event/RegisterEventFormModal';

import eventEmptyImage from '@/../public/general/img-empty.png';
import useActivities from '@/hooks/useActivities';
import useEvents from '@/hooks/useEvents';

type EventPageProps = {
  params: {
    eventId?: string;
  };
};

function EventPage({ params: { eventId } }: Readonly<EventPageProps>) {
  const { data: events = [], isLoading: isEventsLoading } = useEvents();

  const { description, categoryId } = events.find((event) => event._id === eventId) ?? {};

  const { data: activities = [], isLoading: isActivitiesLoading } = useActivities(
    categoryId,
    eventId
  );

  const isLoading = isEventsLoading || isActivitiesLoading;

  const isActivities = activities.length > 0;

  const eventDescription = description ?? '';

  return (
    <Spin spinning={isLoading}>
      <div className="flex flex-col gap-10">
        {eventDescription && (
          <div className="flex flex-col gap-6">
            <p className="whitespace-pre-wrap leading-6">{eventDescription}</p>
            {isActivities && <div className="border-b border-primary-30" />}
          </div>
        )}
        {!isActivities && !eventDescription && (
          <div className="mt-10 flex flex-col items-center justify-center gap-6">
            <Image
              src={eventEmptyImage}
              alt="event_empty_image"
              width={200}
              height="0"
              className="opacity-40"
              loading="lazy"
            />
            <div className="font-bold text-gray-60">活動尚未建立，敬請期待。</div>
          </div>
        )}
        <LoginModal />
        <ActivityCard activities={activities} isLoading={isActivitiesLoading} />
        <ActivityModal />
        <RegisterEventFormModal />
      </div>
    </Spin>
  );
}

export default EventPage;
