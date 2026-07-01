'use client';

import React from 'react';

import TopicListCollection from '@/components/cana/TopicListCollection';

import growArticles from '@/data/growArticles.json';
import { useRouter } from '@/i18n/routing';

function Grow() {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col gap-14 leading-6 whitespace-pre-wrap">
        {growArticles.map(({ category, articles }) => (
          <TopicListCollection
            key={category}
            heading={`grow.${category}`}
            title={'title'}
            description={'description'}
            clickableListItems={articles.map(({ id, article }) => ({
              key: id,
              id: id,
              label: article,
              onClick: () => {
                router.push(`/cana/grow/${id}`);
              },
            }))}
          />
        ))}
      </div>
    </div>
  );
}

export default Grow;
