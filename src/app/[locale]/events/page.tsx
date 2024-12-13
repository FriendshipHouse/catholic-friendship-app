'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Image from 'next/image';

import useCategories from '@/hooks/useCategories';
import useEvents from '@/hooks/useEvents';
import useImages from '@/hooks/useImages';
import { Link } from '@/i18n/routing';

function EventsIndexPage() {
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  const { data: categoryImages = [], isLoading: isCategoriesImageLoading } =
    useImages('categories/images');

  const { data: events = [], isLoading: isEventsLoading } = useEvents();

  const isLoading = isCategoriesLoading || isEventsLoading;

  return (
    <Spin spinning={isLoading}>
      <div
        className={`xs:grid-cols-2 grid w-full flex-wrap justify-center gap-4 sm:grid-cols-4 md:grid-cols-5 ${categories.length > 5 && 'lg:grid-cols-6'}`}
      >
        {categories.map(({ _id: categoryId, name: categoryName, image, remark }) => {
          const { url = '' } =
            categoryImages.find((imageInfo) => {
              const filename = (imageInfo?.pathname ?? '').split('/').pop();
              return filename === image;
            }) ?? {};

          const filterEvents = events.filter((event) => event.categoryId === categoryId);
          return (
            <div
              key={categoryId}
              className="container flex flex-col items-center gap-6 rounded-lg border border-primary-30 p-5 shadow-4xl"
            >
              <div>
                <Spin spinning={isCategoriesImageLoading} indicator={<LoadingOutlined spin />}>
                  {url && (
                    <Image
                      src={url}
                      alt="image"
                      width={100}
                      height={100}
                      className="h-auto w-28"
                      loading="lazy"
                    />
                  )}
                </Spin>
              </div>
              <div className="text-lg font-bold">{categoryName}</div>
              <div className="flex h-full flex-col justify-between gap-2">
                {filterEvents.map(({ _id: eventId, name: eventName }, index) => (
                  <div key={eventId} className="flex flex-col gap-2 text-center">
                    <Link href={`/events/${eventId}`} className="footerLogoLink">
                      {eventName}
                    </Link>
                    {index !== filterEvents.length - 1 && (
                      <div className="border-b border-primary-30" />
                    )}
                  </div>
                ))}
                <div className="mt-6 text-center text-primary-50">{remark}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Spin>
  );
}

export default EventsIndexPage;