'use client';

import { useCallback, useEffect, useState } from 'react';

import { DoubleRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import debounce from 'lodash/debounce';

import DonateMethodCard from '@/components/house/donate/DonateMethodCard';
import DonatePieChart from '@/components/house/donate/DonatePieChart';

import imageAllocate from '@/../public/about/img-donate-allocate.png';
import imageCash from '@/../public/about/img-donate-cash.png';
import imageCounterTransfer from '@/../public/about/img-donate-counterTransfer.png';
import imageCreditCard from '@/../public/about/img-donate-creditCard.png';
import imageOnlinePay from '@/../public/about/img-donate-onlinePay.png';
import imageDonatePie1 from '@/../public/about/img-donate-pie1.png';
import imageDonatePie2 from '@/../public/about/img-donate-pie2.png';
import imageDonatePie3 from '@/../public/about/img-donate-pie3.png';
import imageDonatePie4 from '@/../public/about/img-donate-pie4.png';

const donatePieList = [
  {
    value: '1',
    title1: '主內聯姻的家庭',
    title2: '教會參與程度較高',
    pieSrc: imageDonatePie1,
    percentage1: '9% 冷淡',
    percentage2: '91% 熱心及仍在教會活動',
  },
  {
    value: '2',
    title1: '不同信仰的家庭',
    title2: '教會參與程度較低',
    pieSrc: imageDonatePie2,
    percentage1: '85% 冷淡',
    percentage2: '15% 熱心及仍在教會活動',
  },
  {
    value: '3',
    title1: '主內聯姻家庭',
    title2: '14歲以下兒童',
    pieSrc: imageDonatePie3,
    percentage1: '6% 未領洗',
    percentage2: '94% 已領洗',
  },
  {
    value: '4',
    title1: '不同信仰家庭',
    title2: '14歲以下兒童',
    pieSrc: imageDonatePie4,
    percentage1: '64% 未領洗',
    percentage2: '36% 已領洗 (參與主日學的孩子更少)',
  },
];

const contentTextList = {
  introTitle: '主內親愛的兄弟姊妹：',
  introContent:
    '願天父的慈愛與基督的恩寵時時與您同在。適逢募款期，由衷感謝您的支持，這份鼓勵我們始終銘感於心。\n\n中心各項牧靈福傳工作，與愛在加納主內聯姻計劃都積極進行中。因為愛在加納的服務，為中心注入新血，他們與中心既有青年共同凝聚於此，激盪出更多的火花，尤其近期又增加二十多歲年輕教友團體，更堅定教友中心一路走來的初衷：為年輕的生命燃起信仰的熱火，在信仰的道路上，與朋友同行，並認識相同信仰的另一伴，建立基督化的家庭！',
  contentTitle: '『教友嫁娶外教，從此就進入不同信仰的婚姻與家庭生活。』\n',
  content:
    '從上圖可看出夫婦信仰的差異，不僅動搖個人信仰，對子女教育更沒有一致的主張，造成婚姻關係緊張，及對宗教的冷漠。不同信仰的婚姻，讓教會失去了一個個原本是教會重要基石的「家庭」！因此，我們不能再忽視「教友流失」這嚴重的問題！\n\n根據我們的研究，有60%的未婚教友希望在主內找到相同信仰的另一伴。在青年的需要上，我們看到了責任。於是愛在加納近幾年竭力促進教友聯姻，安排各式未婚活動，讓僅占台灣1%少數的天主教人口，且又散居各地的未婚教友，有機會與未婚教友相識。然而，僅一次性的活動，而缺乏延續性的相處與認識，實是可惜！兩性的交誼，貴在相處。感謝天主，有教友中心長期耕耘教會社青，每週彌撒及聚會，每月固定活動：不論是工作坊、靈修聚會、信仰課程團體、戶外踏青等，這些都是讓青年更瞭解對方的自然途徑，也是他們信仰得以滋長，情感得以增溫的好機會。\n\n台灣主內聯姻的工作從荒蕪之地，至今開枝散葉，喜訊頻傳。看到一個個天主教家庭的誕生，更催促著我們奮力向前，在我們的努力下，目前愛在加納有婚姻使徒、主內聯姻網站、未婚聯誼活動、一對一的婚姻介紹服務以及教育宣導活動等。除愛在加納現有的服務外，我們更計畫往中南部地區拓展，幫助中南部的青年，認識主內的另一伴。在物價上漲的時代，推展這一切，更需要專業的牧靈人員及龐大經費來推動與運作。\n\n家庭是教會的重要基石。「陪他/她去拜拜，還是自己上教堂？」一直是不同宗教婚姻永遠擺脫不了的難題。85%的教友與非教友結婚後，逐漸與教會疏離的現象，已經是刻不容緩的議題！正視天主教婚姻，關心教會未婚青年，幫助教會一同面對這不容忽視的危險，使本地教會能健康發展，這更是我們該有的積極作為！因此，我們需要您大力奉獻與支持，懇請您鼎力相助。\n\n更「深」～感謝您的相挺，我希望今年更多工作推動，有您更深的奉獻支持！\n更「廣」～經費拮据，盼望您能介紹朋友，成為定期支持我們的奉獻伙伴！\n\n您的認同，是推動我們的理想繼續前進的動力！\n您的支持，愛在加納才能繼續在主內聯姻之路上不停歇地前進！',
};

const donateButtonList = [
  {
    value: 'creditCard',
    imageSrc: imageCreditCard,
    label: '信用卡定期定額',
    content: '網頁操作設定',
    buttonLabel: '定期定額網站',
    buttonLink: 'https://core.newebpay.com/Period/friendho/of35U0',
  },
  {
    value: 'onlinePay',
    imageSrc: imageOnlinePay,
    label: '線上單筆捐款',
    content: '信用卡單筆捐款／WebATM／線上ATM轉帳／超商代碼繳費／條碼繳費',
    buttonLabel: '線上捐款網站',
    buttonLink: 'https://core.newebpay.com/EPG/friendho/GXrl4D',
  },
  {
    value: 'counterTransfer',
    imageSrc: imageCounterTransfer,
    label: '臨櫃單筆捐款',
    content:
      '臨櫃／ATM轉帳：中華郵政復興橋郵局700\n帳號：0001085-0456143\n戶名：社團法人台灣旅北友誼交流協會',
  },
  {
    value: 'cash',
    imageSrc: imageCash,
    label: '現金捐款',
    content: '您可以親自捐款，或透過現金袋郵寄',
  },
  {
    value: 'allocate',
    imageSrc: imageAllocate,
    label: '郵局劃撥',
    content: '劃撥帳號：50451219\n戶名：社團法人台灣旅北友誼交流協會',
  },
];

const readMoreContent = (
  <div className="flex flex-col gap-6">
    <p className="font-bold">{contentTextList.contentTitle}</p>
    <div className="mx-auto my-4 grid w-full grid-cols-2 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-4">
      {donatePieList.map(({ value, title1, title2, pieSrc, percentage1, percentage2 }) => (
        <DonatePieChart
          key={value}
          value={value}
          title1={title1}
          title2={title2}
          pieSrc={pieSrc}
          percentage1={percentage1}
          percentage2={percentage2}
        />
      ))}
    </div>
    <div className="whitespace-pre-wrap leading-6">{contentTextList.content}</div>
  </div>
);

function Donate() {
  const [open, setOpen] = useState(false);
  const [isShowMoreInfo, setIsShowMoreInfo] = useState(true);

  const onRelayout = useCallback(() => {
    const windowWidth = window.innerWidth;
    if (!open && windowWidth < 768) {
      setIsShowMoreInfo(false);
      setOpen(true);
      return;
    }

    if (open && windowWidth >= 768) {
      setIsShowMoreInfo(true);
      setOpen(false);
    }
  }, [open]);

  const debounceResize = debounce(onRelayout, 300);

  useEffect(() => {
    debounceResize();
    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, [debounceResize]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-6 whitespace-pre-wrap leading-6">
        <p className="font-bold">{contentTextList.introTitle}</p>
        <p>{contentTextList.introContent}</p>
      </div>
      {open && !isShowMoreInfo && (
        <Button
          type="default"
          className="!w-fit md:!hidden"
          onClick={() => setIsShowMoreInfo(true)}
        >
          繼續閱讀
          <DoubleRightOutlined className="text-[10px]" />
          婚姻與信仰
        </Button>
      )}
      {isShowMoreInfo && readMoreContent}
      <div className="border-b border-b-primary-40" />
      <div className="mx-auto grid w-full flex-wrap gap-5 md:grid-cols-2">
        {donateButtonList.map(({ value, imageSrc, content, buttonLabel, buttonLink }) => (
          <DonateMethodCard
            key={value}
            value={value}
            imageSrc={imageSrc}
            content={content}
            buttonLabel={buttonLabel}
            buttonLink={buttonLink}
          />
        ))}
      </div>
    </div>
  );
}

export default Donate;
