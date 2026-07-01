'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import canaImage from '@/../public/general/img-cana.png';

function Cana() {
  const t = useTranslations('cana');

  const contentList = [
    {
      key: '1',
      title: 'title1',
      content: 'content1',
    },
    {
      key: '2',
      title: 'title2',
      content: 'content2',
    },
    {
      key: '3',
      title: 'title3',
      content: 'content3',
    },
    {
      key: '4',
      title: 'title4',
      content: 'content4',
    },
  ];

  const canaContent = contentList.map(({ title, content, key }) => (
    <div className="flex flex-col gap-2 leading-6" key={key}>
      <div className="text-lg font-bold text-gray-80">{t(title)}</div>
      <div className="text-gray-60">{t(content)}</div>
    </div>
  ));

  return (
    <div className="flex flex-col justify-center gap-10 p-5">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-around">
        <div className="flex flex-col gap-4">
          <Image src={canaImage} alt="canaImage" loading="lazy" />
          <Button
            type="default"
            target="_blank"
            href="https://www.lovecana.org.tw/index.php"
            aria-label="Go to LoveCana Website"
          >
            {t('canaWeb')}
            <ArrowRightOutlined className="text-xs" />
          </Button>
        </div>
        <div className="leading-7 whitespace-pre-wrap">{t('description')}</div>
      </div>
      <div className="border-b border-b-primary-30" />
      <div className="flex flex-col gap-8 md:p-5 leading-6">{canaContent}</div>
    </div>
  );
}

export default Cana;
