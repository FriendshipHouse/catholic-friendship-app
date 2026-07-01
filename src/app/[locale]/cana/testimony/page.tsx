'use client';

import React from 'react';

import TopicListCollection from '@/components/cana/TopicListCollection';

import testimonyArticles from '@/data/testimonyArticles.json';
import { useRouter } from '@/i18n/routing';

function Testimony() {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col gap-14 leading-6 whitespace-pre-wrap">
        {testimonyArticles.map(({ category, articles }) => (
          <TopicListCollection
            key={category}
            heading={`testimony.${category}`}
            title={'title'}
            description={'description'}
            clickableListItems={articles.map(({ id, article }) => ({
              key: id,
              id: id,
              label: article,
              onClick: () => {
                router.push(`/cana/testimony/${id}`);
              },
            }))}
          />
        ))}
      </div>
    </div>
  );
}

export default Testimony;
