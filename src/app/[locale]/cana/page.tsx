'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import canaImage from '@/../public/general/img-cana.png';

function Cana() {
  const t = useTranslations();

  const canaDescription = {
    content:
      '專屬天主教友的服務，\n從婚前主內聯姻教育到協助未婚青年尋找相同信仰的對象；\n婚姻是一件聖事，標記着天主的愛~\n讓我們的教會有一個更健康的未來。',
  };

  const contentList = [
    {
      key: '1',
      title: '室內/戶外聯誼活動',
      content:
        '透過小團體的輕鬆互動，幫助未婚青年認識更多主內的朋友，半天的時間，幫助未婚青年在忙碌的生活中更有效率地與主內朋友取得交集。',
    },
    {
      key: '2',
      title: '一對一介紹',
      content:
        '電話訪談事先了解未婚教友青年的狀況與需求，在名單中為大家尋找彼此適切的對象，進而從中幫助連結或是安排第一次見面。',
    },
    {
      key: '3',
      title: '愛在加納聯姻網',
      content:
        '透過網路拉近彼此距離，不分時段不分區的認識各地未婚青年教友，線上電腦媒合出較貼近自己期許對象的條件，從網路上的訊系互動起步，進而發展！',
    },
    {
      key: '4',
      title: '主內聯姻教育',
      content:
        '為了教會更健康的未來，邀請全台約200個堂區合作推廣，按月編寫並寄送教育文章，此外還有婚姻金句，彌撒信友禱詞中為教會未婚青年建立聖家的意向祈禱，幫助在堂區中落實主內聯姻的理念。',
    },
  ];

  const canaContent = contentList.map(({ title, content, key }) => (
    <div className="flex flex-col gap-2 leading-6" key={key}>
      <div className="text-lg font-bold text-gray-80">{title}</div>
      <div className="text-gray-60">{content}</div>
    </div>
  ));

  return (
    <div className="flex flex-col justify-center gap-10 p-5">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-around">
        <div className="flex flex-col gap-4">
          <Image src={canaImage} alt="canaImage" loading="lazy" />
          <Button type="default" target="_blank" href="https://www.lovecana.org.tw/index.php">
            {t('cana.canaWeb')}
            <ArrowRightOutlined className="text-xs" />
          </Button>
        </div>
        <div className="leading-7 whitespace-pre-wrap">{canaDescription.content}</div>
      </div>
      <div className="border-b border-b-primary-30" />
      <div className="flex flex-col gap-8 md:p-5 leading-6">{canaContent}</div>
    </div>
  );
}

export default Cana;
