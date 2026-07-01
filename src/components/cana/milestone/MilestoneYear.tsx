'use client';

import React from 'react';

import Image from 'next/image';

type MilestoneEvent = {
  id: string;
  period: string;
  detail: string;
  image?: string;
  pdf?: string;
};

type MilestoneYearProps = {
  year?: string;
  title: string;
  intro: string;
  coverImage?: string;
  coverPdf?: string;
  events: MilestoneEvent[];
};

function EventCard({ event, align }: Readonly<{ event: MilestoneEvent; align: 'left' | 'right' }>) {
  const hasMedia = !!event.image || !!event.pdf;

  const mediaContent = event.image ? (
    <Image
      src={`/milestone/img/img_${event.image}`}
      alt={event.period}
      className="max-h-40 w-full object-cover"
      width={300}
      height={300}
      loading="lazy"
    />
  ) : (
    <div className="flex h-16 w-full items-center justify-center gap-2 bg-primary-10 text-sm text-primary">
      <span>📄</span>
      <span>查看文件</span>
    </div>
  );

  return (
    <li
      className={`
    relative flex w-full flex-col sm:flex-row
    text-start
    ${align === 'left' ? 'sm:text-end' : 'sm:text-start'}
  `}
    >
      <span
        className="
      absolute -left-4 top-2 h-3 w-3 rounded-full border-2 border-primary-70 bg-white
      sm:left-1/2 sm:-translate-x-1/2
    "
      />

      {align === 'right' && <div className="hidden sm:block sm:flex-1" />}

      <div
        className={`
      flex flex-col w-full rounded-md sm:ml-0 sm:w-[48%]
      ${align === 'left' ? 'sm:mr-8' : 'sm:ml-8'}
    `}
      >
        <p className="mb-1 text-lg font-semibold text-primary-70">{event.period}</p>
        <p className="text-sm leading-relaxed text-grey-80">{event.detail}</p>

        {hasMedia &&
          (event.pdf ? (
            <a
              href={`/milestone/pdf/${event.pdf}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full overflow-hidden rounded-lg border border-primary-40 transition-opacity hover:opacity-80"
            >
              {mediaContent}
            </a>
          ) : (
            <div className="mt-3 w-full overflow-hidden rounded-lg border border-primary-40">
              {mediaContent}
            </div>
          ))}
      </div>

      {align === 'left' && <div className="hidden sm:block sm:flex-1" />}
    </li>
  );
}

function MilestoneYear({
  year,
  title,
  intro,
  coverImage,
  coverPdf,
  events,
}: Readonly<MilestoneYearProps>) {
  const coverImageEl = coverImage && (
    <Image
      src={`/milestone/img/img_${coverImage}`}
      alt={title}
      width={600}
      height={400}
      loading="lazy"
      className="h-full w-full object-cover"
    />
  );

  return (
    <section className="relative z-20 flex flex-col gap-14">
      <div className="w-full flex flex-col gap-10 justify-center items-start">
        <div className={`flex gap-6 ${coverImage ? 'flex-col sm:flex-row' : ''} items-center`}>
          {coverImage && (
            <div className="w-full shrink-0 overflow-hidden rounded-lg border border-primary-40 sm:w-1/2">
              {coverPdf ? (
                <a
                  href={`/milestone/pdf/${coverPdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full transition-opacity hover:opacity-80"
                >
                  {coverImageEl}
                </a>
              ) : (
                coverImageEl
              )}
            </div>
          )}
          <p className="w-full text-sm leading-relaxed text-grey-60">{intro}</p>
        </div>
      </div>

      <ul className="relative flex flex-col gap-6 pl-4 sm:pl-0">
        <div className="absolute left-1 top-2 h-full w-px bg-primary-40 sm:left-1/2 sm:-translate-x-1/2" />

        {events.length > 0 && <EventCard event={events[0]} align="right" />}

        {events.slice(1, -1).map((event, index) => (
          <EventCard key={event.id} event={event} align={index % 2 === 0 ? 'left' : 'right'} />
        ))}

        {events.length > 1 && <EventCard event={events[events.length - 1]} align="left" />}
      </ul>
    </section>
  );
}

export default MilestoneYear;
