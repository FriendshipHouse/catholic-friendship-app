'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import friendshipImage from '@/../public/about/img-friendshipLogo.png';

const taskList = [
  {
    item: 'taskItem1',
    content: 'taskContent1',
  },
  {
    item: 'taskItem2',
    content: 'taskContent2',
  },
  {
    item: 'taskItem3',
    content: 'taskContent3',
  },
  {
    item: 'taskItem4',
    content: 'taskContent4',
  },
];

function Friendship() {
  const t = useTranslations('houseFriendship');
  return (
    <div className="flex flex-col items-center gap-5 md:flex-row md:justify-around">
      <div className="p-5">
        <Image src={friendshipImage} alt="friendshipImage" loading="lazy" />
      </div>
      <div className="flex flex-col gap-5 leading-6 text-gray-80 md:w-3/5">
        <div>{t('description')}</div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">{t('purpose')}</div>
          <div className="text-gray-70">{t('purposeContent')}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">{t('task')}</div>
          <div className="flex flex-col gap-2 text-gray-70">
            {taskList.map(({ item, content }) => (
              <div key={item} className="flex gap-2">
                <div>{t(item)}</div>
                <div>{t(content)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friendship;
