'use client';

import React from 'react';

import { Button, Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { useTranslations } from 'next-intl';

function Priest() {
  const t = useTranslations('about-priest');

  const briefIntro = {
    content:
      '歐義明神父來台 57 年，除了55~60年間先後服務於二林天主堂及竹山天主堂，以及其他使徒工作外，從63年起，歐神父服務於當時的「旅北教友中心」(友誼教友活動中心前身)，他是教友中心的大家長，他是大家的「老歐」，他一如慈父般24小時守護這個屬於青年的家。\n歐神父擔任中心主任司鐸至離世。',
  };
  const lifeStory = {
    title: '生平事蹟簡述',
    content:
      '一九三七年三月二十日，出生於紐約，其家庭成員皆是熱心天主教徒。\n一九五五年在教區神學院接受陶成。\n一九五七年加入瑪利諾外方傳教會。\n一九六四年六月十三日在紐約瑪利諾總會晉鐸。同年九月來臺灣。\n一九六六年奉派到彰化二林當副本堂，協助高德輝神父牧靈工作。\n一九六八年到竹山擔任本堂神父，歷時三年。\n一九七二年在新竹語言學校學習國語，並協助其他堂區牧靈工作。\n一九七四年二月擔任臺灣男修會執行秘書。\n一九七四年十月擔任臺北教友中心副主任，之後擔任中心主任司鐸至離世。\n一九八七年設立瑪利諾語言中心臺北分部。\n一九八一年至一九九一年，擔任「天主教臺中力行汽車修護補習班」指導司鐸，為臺灣培育汽車修護專才。\n一九九一年至一九九七年擔任瑪利諾會臺灣區會長。\n二零一四年推動愛在加納主內聯姻服務，竭力促成教友建立基督徒家庭。\n二零一七年七月八日以對我國有殊勳歸化我國國籍，獲頒中華民國身分證。\n二零二一年五月九日下午二時四十八分在臺大醫院蒙主恩召。\n\n歐神父一生積極牧靈福傳，不畏艱難，堅忍向前。生前對離鄉背井的旅北教友青年照顧有加，更熱衷支持未婚教友在主內建立基督化的家庭。他逾世紀的生命歲月皆奉獻給台灣教會青年，始終如一。\n歐神父在台灣這塊土地上，奉獻了他的一生。他為台灣教會所做的，並非文字所能表達，願在你我的分享中，我們一同追憶神父與我們生命交集的點點滴滴。一如神父一生所秉持的：「基督是我信仰生活的中心。」',
  };

  const video = (
    <div className="flex flex-wrap justify-between gap-4 md:grid md:grid-cols-2 md:gap-4">
      <div className="flex w-full flex-col gap-4">
        <div className="hidden font-semibold md:flex">歐義明神父在台傳教的一生</div>
        <iframe
          className="w-full rounded-lg sm:flex"
          width="500"
          height="300"
          src="https://www.youtube.com/embed/iv3ICK-YRK8"
          title="歐義明神父 追思影片"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="hidden font-semibold md:flex">神父逝世周年彌撒精華片段</div>
        <iframe
          className="w-full rounded-lg sm:flex"
          width="500"
          height="300"
          src="https://www.youtube.com/embed/qneftUwQyTE"
          title="“神秘嘉賓”參加「歐義明神父逝世一週年追思會」"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );

  const lifeStoryItem: CollapseProps['items'] = [
    {
      key: 'lifeStory',
      label: (
        <div className="text-lg font-bold text-gray-80 hover:text-gray-60">{lifeStory.title}</div>
      ),
      children: <p className="whitespace-pre-wrap">{lifeStory.content}</p>,
    },
  ];

  const videoItem: CollapseProps['items'] = [
    {
      key: 'video',
      label: <div className="text-lg font-bold text-gray-80 hover:text-gray-60">影片分享</div>,
      children: video,
    },
  ];

  const bookButtonList = [
    {
      value: 'BookPriest',
      url: 'https://drive.google.com/file/d/1ZsgRTJMZ8rsoB9x8U7S0XC7RIVfyNWZz/view',
    },
    {
      value: 'BookElder',
      url: 'https://drive.google.com/file/d/1TbCclPbL2okwhfLRCyCdpl6W59w63pxT/view',
    },
    {
      value: 'BookYouth',
      url: 'https://drive.google.com/file/d/1DkTQiFAMr6ijb3HKjhwchvkV_afVdx2g/view',
    },
    {
      value: 'BookColleague',
      url: 'https://drive.google.com/file/d/1notddh_mi3iSoXHDIpzNTntqt-qZUzlY/view',
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 leading-6 whitespace-pre-wrap">
        <div className="text-lg font-bold">歐義明神父（Rev. Alan T. Doyle, MM）</div>
        <p className="text-md">{briefIntro.content}</p>
        <div className="w-full border-t border-solid border-primary-30" />

        <div className="hidden gap-4 md:flex md:flex-col">
          <div className="text-lg font-bold">{lifeStory.title}</div>
          <p>{lifeStory.content}</p>
          <div className="w-full border-t border-solid border-primary-30" />
          <div className="text-lg font-bold">影片分享</div>
          {video}
        </div>

        <div className="flex flex-col gap-2 md:hidden">
          <Collapse
            items={lifeStoryItem}
            ghost={true}
            expandIconPosition="end"
            className="[&_.ant-collapse-header]:!pl-0"
          />
          <div className="w-full border-t border-solid border-primary-30" />
          <Collapse
            items={videoItem}
            ghost={true}
            expandIconPosition="end"
            className="[&_.ant-collapse-header]:!pl-0"
          />
        </div>

        <div className="w-full border-t border-solid border-primary-30" />
        <div className="text-lg font-bold">逝世週年追思文集</div>
        <div className="flex flex-col items-start gap-x-4 gap-y-2 md:min-w-[400px] md:flex-row">
          {bookButtonList.map(({ value, url }) => {
            return (
              <Button
                type="default"
                key={value}
                href={url}
                className="!w-full !text-wrap !bg-white/20 !shadow-4xl !backdrop-blur"
              >
                {t(value)}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Priest;
