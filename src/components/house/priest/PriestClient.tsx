'use client';

import React from 'react';

import { Button } from 'antd';

import PriestMilestone from '@/components/house/priest/PriestMilestone';

type MilestoneEvent = {
  id: string;
  period: string;
  detail: string;
  image?: string;
  pdf?: string;
};

type Milestone = {
  year: string;
  title: string;
  intro: string;
  coverImage?: string;
  coverPdf?: string;
  events: MilestoneEvent[];
};

type PriestData = {
  priest: string;
  briefIntro: string;
  lifeStoryTitle: string;
  videoTitle: string;
  videoLife: string;
  videoMass: string;
  bookTitle: string;
  BookPriest: string;
  BookElder: string;
  BookYouth: string;
  BookColleague: string;
  milestones: Milestone[];
  lifeStorySummary: string;
};

function Priest({ data }: Readonly<{ data: PriestData }>) {
  const milestones = data.milestones;

  const bookButtonList = [
    {
      value: data.BookPriest,
      url: 'https://drive.google.com/file/d/1ZsgRTJMZ8rsoB9x8U7S0XC7RIVfyNWZz/view',
    },
    {
      value: data.BookElder,
      url: 'https://drive.google.com/file/d/1TbCclPbL2okwhfLRCyCdpl6W59w63pxT/view',
    },
    {
      value: data.BookYouth,
      url: 'https://drive.google.com/file/d/1DkTQiFAMr6ijb3HKjhwchvkV_afVdx2g/view',
    },
    {
      value: data.BookColleague,
      url: 'https://drive.google.com/file/d/1notddh_mi3iSoXHDIpzNTntqt-qZUzlY/view',
    },
  ];

  return (
    <div className="flex flex-col gap-10 leading-6 whitespace-pre-wrap">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">{data.priest}</div>
        <div className="flex flex-col gap-14">
          {milestones.map((m) => (
            <PriestMilestone
              key={m.year}
              title={m.title}
              intro={m.intro}
              coverImage={m.coverImage || undefined}
              coverPdf={m.coverPdf || undefined}
              events={m.events}
            />
          ))}
          <div>{data.lifeStorySummary}</div>
        </div>
      </div>

      <div className="w-full border-t border-solid border-primary-30" />

      <div className="flex flex-col  gap-4 md:flex md:flex-col">
        <div className="text-lg font-bold">{data.videoTitle}</div>
        <div className="flex flex-wrap justify-between gap-4 md:grid md:grid-cols-2 md:gap-4">
          <div className="flex w-full flex-col gap-4">
            <div className="hidden font-semibold md:flex">{data.videoLife}</div>
            <iframe
              className="w-full rounded-lg sm:flex"
              width="500"
              height="300"
              src="https://www.youtube.com/embed/iv3ICK-YRK8"
              title="歐義明神父 追思影片"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="hidden font-semibold md:flex">{data.videoMass}</div>
            <iframe
              className="w-full rounded-lg sm:flex"
              width="500"
              height="300"
              src="https://www.youtube.com/embed/qneftUwQyTE"
              title="“神秘嘉賓”參加「歐義明神父逝世一週年追思會」"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="w-full border-t border-solid border-primary-30" />

      <div className="flex flex-col  gap-4 md:flex md:flex-col">
        <div className="text-lg font-bold">{data.bookTitle}</div>
        <div className="flex flex-col items-start gap-x-4 gap-y-2 md:min-w-[400px] md:flex-row">
          {bookButtonList.map(({ value, url }) => (
            <Button
              type="default"
              key={value}
              href={url}
              target="_blank"
              className="!w-full !text-wrap !bg-white/20 !shadow-4xl !backdrop-blur"
            >
              {value}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Priest;
