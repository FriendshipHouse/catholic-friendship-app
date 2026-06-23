'use client';

import { useTranslations } from 'next-intl';

import ClickableList from './ClickableList';

type TopicListCollectionTypes = {
  heading: string;
  title: string;
  description: string;
  clickableListItems: {
    id: string;
    label: string;
    onClick: () => void;
  }[];
};

function TopicListCollection({
  heading,
  title,
  description,
  clickableListItems,
}: Readonly<TopicListCollectionTypes>) {
  const t = useTranslations(heading);

  return (
    <div className="flex flex-col gap-4 leading-6 whitespace-pre-wrap">
      <div className="text-lg font-bold">{t(title)}</div>
      <p className="text-md">{t(description)}</p>
      <ul className="list-disc pl-5">
        {clickableListItems.map(({ id, label, onClick }) => (
          <ClickableList key={id} heading={heading} items={[{ id, label, onClick }]} />
        ))}
      </ul>
    </div>
  );
}

export default TopicListCollection;
