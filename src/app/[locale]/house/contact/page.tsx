'use client';

import React from 'react';

import { House, TruckFront } from 'react-bootstrap-icons';

const contactList = [
  {
    value: 'contact',
    icon: <House />,
    children: [
      {
        title: '電話',
        content: '（02）2314-1833',
      },
      {
        title: '郵件',
        content: 'friendyoung23141833@gmail.com',
      },
      {
        title: '地址',
        content: '台北市中山北路一段2號八樓800室',
      },
      {
        title: '彌撒時間',
        content: '每周六晚上7:15\n每周日晚上7:30（周日因疫情暫停）',
      },
    ],
  },
  {
    value: 'transport',
    icon: <TruckFront />,
    children: [
      {
        title: '火車捷運',
        content:
          '台北車站捷運站M7出口步行約1分鐘\n（從淡水與板橋來搭第1車廂；從新店與南港來搭最後一個車廂）',
      },
      {
        title: '公車',
        content: '5, 262, 247, 307, 310, 227, 224, 39',
      },
      {
        title: '開車',
        content: '平日晚上及週末有地下停車場可停車(數量有限)',
      },
    ],
  },
];

function Contact() {
  return (
    <div className="flex flex-col gap-4">
      <div className="mx-auto grid w-full flex-wrap gap-5 sm:grid-cols-2">
        {contactList.map(({ value, icon, children }) => (
          <div
            key={value}
            className="mx-auto flex w-full min-w-60 flex-col justify-between gap-4 rounded-md border border-gray-40 p-5 shadow-4xl sm:gap-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex w-10 items-center rounded-md text-2xl text-primary-70">
                {icon}
              </div>
            </div>
            <div className="mt-5 text-wrap">
              {children.map(({ title, content }, index) => (
                <div
                  key={title}
                  className="flex flex-col gap-2 whitespace-pre-wrap  leading-6 pt-2"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 min-w-8 text-wrap font-bold">{title}</div>
                    <div className="text-gray-60">{content}</div>
                  </div>
                  {index !== children.length - 1 && <div className="border-b border-b-gray-20" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex h-72 w-full flex-col gap-8 rounded-md border border-gray-40 p-3 shadow-4xl">
        <iframe
          title="google map"
          className="h-full w-full rounded-md brightness-110 saturate-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.6466861661465!2d121.51691897607895!3d25.046061637804378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a972222f6c45%3A0x5f0264d335e281c2!2z5aSp5Li75pWZ5Y-L6Kq85pWZ5Y-L5rS75YuV5Lit5b-D!5e0!3m2!1sen!2stw!4v1718700097036!5m2!1sen!2stw"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export default Contact;
