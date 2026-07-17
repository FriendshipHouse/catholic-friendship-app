'use client';

import { useState } from 'react';

import { useTranslations } from 'use-intl';

import MilestoneYear from '@/components/cana/milestone/MilestoneYear';
import YearNav from '@/components/cana/milestone/YearNav';
import YearWatermark from '@/components/cana/milestone/YearWatermark';
import SubTitle from '@/components/layout/SubTitle';

type Props = { milestones: any[] };

export default function MilestoneClient({ milestones }: Readonly<Props>) {
  const t = useTranslations('pathname');
  const years = milestones.map((m) => m.year);
  const [activeYear, setActiveYear] = useState(years[0]);
  const activeMilestone = milestones.find((m) => m.year === activeYear);

  return (
    <div className="relative flex flex-col gap-6 px-5 pt-5 md:px-10 md:pt-10">
      <div className="relative">
        <SubTitle title={t('milestone')} />
        {activeMilestone && <YearWatermark year={activeMilestone.year} />}
      </div>
      <div className="z-20 flex sticky top-0 sm:static items-center justify-end">
        <YearNav years={years} activeYear={activeYear} onSelect={setActiveYear} />
      </div>
      {activeMilestone && (
        <MilestoneYear
          key={activeMilestone.year}
          year={activeMilestone.year}
          title={activeMilestone.title}
          intro={activeMilestone.intro}
          coverImage={activeMilestone.coverImage}
          coverPdf={activeMilestone.coverPdf}
          events={activeMilestone.events}
        />
      )}
    </div>
  );
}
