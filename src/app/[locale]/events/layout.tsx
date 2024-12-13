'use client';

import { useMemo } from 'react';

import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import Background from '@/components/layout/Background';
import Footer from '@/components/layout/Footer';
import SubTitle from '@/components/layout/SubTitle';

import useActivities from '@/hooks/useActivities';
import useEvents from '@/hooks/useEvents';

function EventLayout({ children }: Readonly<RootProvider>) {
  const t = useTranslations('');
  const params = useParams();
  const { eventId } = params;

  const { data: events = [] } = useEvents();
  const { name: eventName, categoryId } = events.find((event) => event._id === eventId) ?? {};

  const { data: activities = [] } = useActivities(categoryId, eventId as string);

  const eventTitle = eventName ?? t('pathname.events');

  const isRegistrationShow = useMemo(() => {
    if (!activities) return;

    const registerItems = activities.filter((item) => {
      if (item.googleFormLink) return false;

      if (typeof item.date === 'string' && item.systemFormInfo?.dueDate) {
        const { date } = item;
        const { dueDate } = item.systemFormInfo;

        const dueDateReference = {
          day: dayjs(date),
          week: dayjs(date).subtract(1, 'week'),
          month: dayjs(date).subtract(1, 'month'),
        };

        if (dueDate === 'day' || dueDate === 'week' || dueDate === 'month') {
          return dueDate && dayjs().isBefore(dueDateReference[dueDate], 'day');
        }
      }
      return false;
    });

    return registerItems.length > 0;
  }, [activities]);

  return (
    <div className="flex w-full flex-col">
      <Background />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-lg flex-col justify-between bg-white shadow-4xl">
        <div className="flex h-full flex-col">
          <div className="px-5 pt-5 md:px-10 md:pt-10">
            <SubTitle
              title={eventTitle}
              buttonLabel={t('button.register')}
              isRegistrationShow={isRegistrationShow}
            />
          </div>
          <div className="h-full p-5 md:p-10">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default EventLayout;
