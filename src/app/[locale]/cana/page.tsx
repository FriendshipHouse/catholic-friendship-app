'use client';

import { Collapse, CollapseProps } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import CanaButton from '@/components/cana/index/CanaButton';
import PieChart from '@/components/cana/index/PieChart';

import imageDonatePie1 from '@/../public/about/img-donate-pie1.png';
import imageDonatePie2 from '@/../public/about/img-donate-pie2.png';
import imageDonatePie3 from '@/../public/about/img-donate-pie3.png';
import imageDonatePie4 from '@/../public/about/img-donate-pie4.png';
import canaImage from '@/../public/general/img-pouring.png';

const pieList = [
  {
    value: '2',
    title1: 'nonReligionFamily',
    title2: 'participation',
    pieSrc: imageDonatePie2,
    description: 'description2',
  },
  {
    value: '4',
    title1: 'nonReligionFamily',
    title2: 'under14',
    pieSrc: imageDonatePie4,
    description: 'description4',
  },
  {
    value: '1',
    title1: 'religionFamily',
    title2: 'participation',
    pieSrc: imageDonatePie1,
    description: 'description1',
  },
  {
    value: '3',
    title1: 'religionFamily',
    title2: 'under14',
    pieSrc: imageDonatePie3,
    description: 'description3',
  },
];

const aboutButtonList = [
  { value: 'statement' },
  { value: 'testimony' },
  { value: 'donate' },
  { value: 'grow' },
  { value: 'prayer' },
  { value: 'milestone' },
  { value: 'canaEvents' },
];

function CanaIndex() {
  const t = useTranslations('cana');
  const projectPlans = t.raw('project_plans') as { title: string; content: string }[];

  const moreCanaItem: CollapseProps['items'] = [
    {
      key: 'moreCana',
      label: (
        <div className="text-lg font-bold text-gray-80 hover:text-gray-60">{t('moreCana')}</div>
      ),
      children: (
        <div className="flex flex-col gap-6 whitespace-pre-wrap leading-6">
          <p className="">{t('introduction')}</p>
          <div className="mx-auto my-4 grid w-full grid-cols-2 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-4">
            {pieList.map(({ value, title1, title2, pieSrc, description }) => (
              <PieChart
                key={value}
                value={value}
                title1={title1}
                title2={title2}
                pieSrc={pieSrc}
                description={description}
              />
            ))}
          </div>
          <p>{t('statistics_description')}</p>
          <p>{t('project_title')}</p>
          <div className="flex flex-col gap-4">
            {projectPlans.map((plan) => (
              <div key={plan.title}>
                <p className="font-bold">{plan.title}</p>
                <p>{plan.content}</p>
              </div>
            ))}
          </div>
          <div>
            <p>{t('web_origin.content')}</p>
          </div>
        </div>
      ),
    },
  ];

  const transitionCanaItem: CollapseProps['items'] = [
    {
      key: 'transitionCana',
      label: (
        <div className="text-lg font-bold text-gray-80 hover:text-gray-60">
          {t('transition.title')}
        </div>
      ),
      children: <p className="whitespace-pre-wrap">{t('transition.content')}</p>,
    },
  ];

  return (
    <div className="relative flex flex-col items-center gap-5">
      <div className="absolute z-0 w-full h-full flex items-center justify-center p-5 opacity-10">
        <Image src={canaImage} alt="canaImage" loading="lazy" className="w-[70%]" />
      </div>

      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-6 whitespace-pre-wrap leading-6">
          <p className="font-bold">{t('naming')}</p>
          <p>{t('content')}</p>
        </div>

        <div className="border-b border-primary-30" />

        <div className="z-10 flex flex-col gap-6">
          <Collapse
            items={moreCanaItem}
            ghost={true}
            expandIconPosition="end"
            className="[&_.ant-collapse-header]:!pl-0"
          />
          <div className="border-b border-primary-30" />

          <Collapse
            items={transitionCanaItem}
            ghost={true}
            expandIconPosition="end"
            className="[&_.ant-collapse-header]:!pl-0"
          />

          <div className="border-b border-primary-30" />

          <div className="container grid grid-cols-2 gap-x-6 gap-y-4">
            {aboutButtonList.map(({ value }) => (
              <CanaButton key={value} value={value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CanaIndex;
