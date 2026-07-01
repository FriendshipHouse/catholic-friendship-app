'use client';

import React, { useState } from 'react';

import TopicListCollection from '@/components/cana/TopicListCollection';
import ImageCollection from '@/components/cana/prayer/ImageCollection';

import prayers from '@/data/prayers.json';
import { useRouter } from '@/i18n/routing';

const filerPrayerCategory = prayers.filter((item) => item.category === 'prayer');
const filterImageCategory = prayers.filter((item) => item.category !== 'prayer');

function Prayer() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<{ src: string; label: string } | null>(null);

  return (
    <div className="flex flex-col gap-14 leading-6 whitespace-pre-wrap">
      {filterImageCategory.map(({ category, content }) => (
        <ImageCollection
          key={category}
          category={category}
          imageItems={content.map(({ id, label }) => ({
            key: id,
            id: id,
            label: label,
            onClick: () => {
              setSelectedImage({
                src: `/prayer/${category}/original/img_${id}.png`,
                label,
              });
            },
          }))}
          selectedImage={selectedImage}
          onModalClose={() => setSelectedImage(null)}
        />
      ))}

      {selectedImage && <div />}

      {filerPrayerCategory.map(({ category, content }) => (
        <TopicListCollection
          key={category}
          heading={`prayer.${category}`}
          title={'title'}
          clickableListItems={content.map(({ id, label }) => ({
            key: id,
            id: id,
            label: label,
            onClick: () => {
              router.push(`/cana/prayer/${id}`);
            },
          }))}
        />
      ))}
    </div>
  );
}

export default Prayer;
