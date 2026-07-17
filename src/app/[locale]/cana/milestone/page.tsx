import { getLocale } from 'next-intl/server';

import MilestoneClient from './MilestoneClient';

const loaders = {
  'zh-TW': () => import('@/data/milestones/zh-TW.json'),
  'en-US': () => import('@/data/milestones/en-US.json'),
} as const;

export default async function MilestonePage() {
  const locale = (await getLocale()) as keyof typeof loaders;
  const { default: milestones } = await (loaders[locale] ?? loaders['zh-TW'])();

  return <MilestoneClient milestones={milestones.milestones} />;
}
