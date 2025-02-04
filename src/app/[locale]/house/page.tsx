'use client';

import Image from 'next/image';

import HouseButton from '@/components/house/index/HouseButton';

import aboutImage from '@/../public/general/img-dance.png';

const aboutButtonList = [
  { value: 'member' },
  { value: 'priest' },
  { value: 'donate' },
  { value: 'contact' },
  { value: 'friendship' },
];

const content = {
  title: '牧靈‧信仰‧成長‧共融',
  paragraph:
    '在台灣，找到與自己信仰相同的夥伴和團體不是件簡單的事。\n\n台北天主教教友中心是青年的另一個家、是大家成長的地方、是朋友相聚的所在，更是信仰旅途中的橋樑。\n除舉辦各類活動及工作坊外，我們特別關心台灣教會中的未婚社會青年及與教會疏遠的教友們，期盼能縮短他們與信仰的距離，更在教友中心找到歸屬團體。\n歡迎所有正在“尋找”的青年夥伴，來與我們一起追隨耶穌的腳步～',
};

function HouseIndex() {
  return (
    <div className="relative flex flex-col items-center gap-5 md:flex-row md:justify-between">
      <div className="hidden items-center p-5 md:flex">
        <Image src={aboutImage} alt="aboutImage" loading="lazy" />
      </div>
      <div className="absolute z-0 flex items-center p-5 opacity-10 md:hidden">
        <Image src={aboutImage} alt="aboutImage" loading="lazy" />
      </div>
      <div className="z-10 flex flex-col gap-6 md:w-1/2">
        <div className="flex flex-col gap-4 whitespace-pre-wrap leading-6">
          <div className="text-lg font-bold">{content.title}</div>
          <p>{content.paragraph}</p>
        </div>
        <div className="container grid grid-cols-2 gap-x-6 gap-y-4">
          {aboutButtonList.map(({ value }) => (
            <HouseButton key={value} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HouseIndex;
