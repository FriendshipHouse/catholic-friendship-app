'use client';

import { useCallback } from 'react';

import { Card, Spin } from 'antd';
import Image from 'next/image';

import posterEmptyImage from '@/../public/general/img-empty.png';
import usePosters from '@/hooks/usePosters';

function PosterCard() {
  const { Meta } = Card;

  const { data: posters = [], isLoading: isPostersLoading } = usePosters();

  const getImageId = useCallback((link: string) => {
    const splitLink = link.split('/');
    const findId = splitLink.indexOf('d');
    return findId !== -1 ? splitLink[findId + 1] : null;
  }, []);

  return (
    <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3">
      {posters.map((poster) => {
        const { _id, title, link } = poster ?? {};

        return (
          <Spin key={_id} spinning={isPostersLoading}>
            <Card
              hoverable
              cover={
                <div className="h-52 w-full items-center overflow-hidden">
                  {
                    <Image
                      src={
                        getImageId(link)
                          ? `https://drive.google.com/uc?export=view&id=${getImageId(link)}`
                          : posterEmptyImage
                      }
                      alt="poster_Image"
                      width={300}
                      height={215}
                      className="flex min-h-64 w-full items-center sm:min-h-52"
                      loading="lazy"
                      quality={100}
                    />
                  }
                </div>
              }
              loading={isPostersLoading}
              onClick={() => window.open(link, '_blank')}
            >
              <Meta
                title={
                  <div className="flex text-wrap text-lg font-bold justify-center">{title}</div>
                }
              />
            </Card>
          </Spin>
        );
      })}
    </div>
  );
}

export default PosterCard;
