'use client';

import { useTranslations } from 'next-intl';

import PieChart from '@/components/cana/moreCana/PieChart';

import imageDonatePie1 from '@/../public/about/img-donate-pie1.png';
import imageDonatePie2 from '@/../public/about/img-donate-pie2.png';
import imageDonatePie3 from '@/../public/about/img-donate-pie3.png';
import imageDonatePie4 from '@/../public/about/img-donate-pie4.png';

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

function MoreCana() {
  const t = useTranslations('moreCana');

  const projectPlans = t.raw('project_plans') as { title: string; content: string }[];

  return (
    <div className="flex w-full flex-col gap-6">
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
          <p className="font-bold">{t('naming_origin.title')}</p>
          <p>{t('naming_origin.content')}</p>
        </div>

        <div>
          <p className="font-bold">{t('transition.title')}</p>
          <p>{t('transition.content')}</p>
        </div>
      </div>
    </div>
  );
}

export default MoreCana;
