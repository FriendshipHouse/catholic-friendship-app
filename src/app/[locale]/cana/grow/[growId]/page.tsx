'use client';

import React from 'react';

import { LeftCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import dynamic from 'next/dynamic';

import TitleHighlight from '@/components/TitleHighlight';

import growArticles from '@/data/growArticles.json';
import { Link, usePathname, useRouter } from '@/i18n/routing';

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-16 text-gray-400 text-sm">載入中...</div>
  ),
});

function GrowIdPage() {
  const router = useRouter();
  const pathname = usePathname();

  const growID = pathname?.split('/').at(-1);

  const allArticles = growArticles.flatMap((categoryObj) => categoryObj.articles);
  const currentArticle = allArticles.find((article) => article.id === growID);

  if (!currentArticle) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-grey-80 font-bold">找不到此文章(ID: {growID})，或文章已被移除。</p>
        <Button onClick={() => router.push('/cana/grow')} className="w-fit">
          返回列表
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:gap-6 gap-4">
      <div className="flex flex-col gap-4 sm:gap-10">
        <div className="flex flex-wrap gap-4 items-end sm:flex-row">
          <Link href={'/cana/grow'}>
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
        <div className="whitespace-pre-wrap leading-6">{currentArticle.content}</div>
      ) : (
        <PdfViewer url={`/pdfs/monthly/${currentArticle.id}.pdf`} />
      )}
    </div>
  );
}

export default GrowIdPage;
