import { getLocale } from 'next-intl/server';

import Priest from '@/components/house/priest/PriestClient';

const loaders = {
  'zh-TW': () => import('@/data/priest/zh-TW.json'),
  'en-US': () => import('@/data/priest/en-US.json'),
} as const;

export default async function PriestPage() {
  const locale = (await getLocale()) as keyof typeof loaders;
  const { default: data } = await (loaders[locale] ?? loaders['zh-TW'])();

  return <Priest data={data} />;
}
