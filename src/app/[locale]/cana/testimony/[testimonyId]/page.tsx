'use client';

import React from 'react';

import { LeftCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Image from 'next/image';

import TitleHighlight from '@/components/TitleHighlight';

import testimonyArticles from '@/data/testimonyArticles.json';
import { Link, usePathname, useRouter } from '@/i18n/routing';

function TestimonyIdPage() {
  const router = useRouter();
  const pathname = usePathname();

  const testimonyID = pathname?.split('/').at(-1);

  const allArticles = testimonyArticles.flatMap((categoryObj) => categoryObj.articles);
  const currentArticle = allArticles.find((article) => article.id === testimonyID);

  if (!currentArticle) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-grey-80 font-bold">找不到此文章(ID: {testimonyID})，或文章已被移除。</p>
        <Button onClick={() => router.push('/cana/testimony')} className="w-fit">
          返回列表
        </Button>
      </div>
    );
  }

  currentArticle.imageCount.forEach((imageId) => {
    console.log(`img_${currentArticle.id}_${imageId}`);
  });

  return (
    <div className="flex flex-col md:gap-6 gap-4">
      <div className="flex flex-col gap-4 sm:gap-10">
        <div className="flex flex-wrap gap-4 items-end sm:flex-row">
          <Link href={'/cana/testimony'}>
            <LeftCircleOutlined className="text-3xl" />
          </Link>
          <TitleHighlight>{currentArticle.article}</TitleHighlight>
        </div>
        <div className="border-b border-primary-30" />
      </div>

      {currentArticle.author && currentArticle.author_remark && (
        <div className="flex flex-col gap-4 sm:gap-8">
          <div className="text-sm text-gray-900 my-4">
            <p className="font-semibold">{currentArticle.author}</p>
            <p>{currentArticle.author_remark}</p>
          </div>
          <div className="border-b border-gray-30" />
        </div>
      )}

      {currentArticle.content ? (
        <div className="flex flex-col gap-6">
          <div className="whitespace-pre-wrap leading-6">{currentArticle.content}</div>
          <div className="flex gap-4 md:flex-row flex-wrap justify-center items-center">
            {currentArticle.imageCount.map((imageId) => (
              <Image
                key={imageId}
                src={`/testimony/img_${currentArticle.id}_${imageId}.jpg`}
                alt={`${currentArticle.article} - ${imageId}`}
                width={400}
                height={400}
                className="w-full max-w-[400px] h-auto rounded-md"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col my-10 gap-6 items-center justify-center">
          {currentArticle.youtubeLink ? (
            <iframe
              width="560"
              height="315"
              src={currentArticle.youtubeLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full max-w-[800px] max-h-[450px] rounded-md"
            />
          ) : (
            '暫無影片連結，請等候影片上傳'
          )}
          {currentArticle.imageCount.map((imageId) => (
            <Image
              key={imageId}
              src={`/testimony/img_${currentArticle.id}_${imageId}.jpg`}
              alt={`${currentArticle.article} - ${imageId}`}
              width={400}
              height={400}
              className="max-w-[600px] h-auto rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TestimonyIdPage;
