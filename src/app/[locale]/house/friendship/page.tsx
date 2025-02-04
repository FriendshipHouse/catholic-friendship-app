'use client';

import Image from 'next/image';

import friendshipImage from '@/../public/about/img-friendshipLogo.png';

const taskList = [
  {
    item: '一、',
    content:
      '舉辦自我成長、兩性聯誼、人際溝通、領導訓練等課程，及為促進個人身心靈平衡和團體的凝聚力之相關活動。',
  },
  {
    item: '二、',
    content: '協助會員組織各類的友誼及成長團體：如：讀書會、才藝班、工作坊、祈禱會等。',
  },
  {
    item: '三、',
    content: '不定期出版與本會宗旨相關之刊物、書籍、光碟等服務。',
  },
  {
    item: '四、',
    content: '其他與本會宗旨相關事項。',
  },
];

function Friendship() {
  return (
    <div className="flex flex-col items-center gap-5 md:flex-row md:justify-around">
      <div className="p-5">
        <Image src={friendshipImage} alt="friendshipImage" loading="lazy" />
      </div>
      <div className="flex flex-col gap-5 leading-6 text-gray-80 md:w-3/5">
        <div>本會為依法設立，非以營利為目的之社會團體。</div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold"> 本會之宗旨：</div>
          <div className="text-gray-70">
            本會以協助從中、南、東部移居至大台北的青年及其家庭、子女，提供學習才藝和參與社會服務，幫助他們適應都會環境及安定其家庭生活。
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold"> 本會之任務：</div>
          <div className="flex flex-col gap-2 text-gray-70">
            {taskList.map(({ item, content }) => (
              <div key={item} className="flex gap-2">
                <div>{item}</div>
                <div>{content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friendship;
