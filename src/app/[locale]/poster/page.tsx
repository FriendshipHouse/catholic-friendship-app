'use client';

import { Spin } from 'antd';
import Image from 'next/image';

import PosterCard from '@/components/poster/PosterCard';

import posterEmptyImage from '@/../public/general/img-empty.png';
import usePosters from '@/hooks/usePosters';

function PosterPage() {
  const { data: posters, isLoading: isPostersLoading } = usePosters();
  return (
    <Spin spinning={isPostersLoading}>
      <div className="flex flex-col gap-10">
        {!posters && (
          <div className="mt-10 flex flex-col items-center justify-center gap-6">
            <Image
              src={posterEmptyImage}
              alt="event_empty_image"
              width={200}
              height="0"
              className="opacity-40"
            />
            <div className="font-bold text-gray-60">尚無檔案分享，可至其他頁面查看單獨資訊。</div>
          </div>
        )}
        <PosterCard />
      </div>
    </Spin>
  );
}

export default PosterPage;
