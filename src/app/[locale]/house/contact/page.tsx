'use client';

import { Button } from 'antd';
import React from 'react';

import { GeoAlt, House, TruckFront } from 'react-bootstrap-icons';

const carParking = [
  { parkingLot: "1/ 博客停車場-家福同安場(總車位 17)", mapHref: "https://maps.app.goo.gl/XoDfuwo9a4bhmwtr9" },
  { parkingLot: "2/ 嘟嘟房廈門站停車場(總車位 7)", mapHref: "https://maps.app.goo.gl/FRh5JcrprEoRavFn9" },
  { parkingLot: "3/ 同安街平面停車場(總車位 21)", mapHref: "https://maps.app.goo.gl/qBw4xFKjM75XKoQG6" },
]

const carContent =
  <div className="flex flex-col gap-1">
    <div>同安街天主堂庭院可停車(數量有限)</div>
    <div>附近停車場：</div>
    {carParking.map(({ parkingLot, mapHref }) => <div className="flex gap-2 items-center
    " key={parkingLot}>
      <Button type="text" href={mapHref} className='!text-sm !p-0 !text-primary-70'><GeoAlt /></Button>
      {parkingLot}
    </div>)}
  </div>


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
        content: '台北市中正區同安街72巷19號(同安街聖若瑟天主堂3F)',
      },
      {
        title: '彌撒時間',
        content: '每周六晚上7:00',
      },
    ],
  },
  {
    value: 'transport',
    icon: <TruckFront />,
    children: [
      {
        title: '捷運',
        content:
          '台北車站-轉捷運至古亭站，2號出口步行約10分鐘',
      },
      {
        title: '公車',
        content: '648. 644. 251. 藍28. 252. 297. 至捷運古亭站(羅斯福)',
      },
      {
        title: '開車',
        content: carContent,
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
                  <div className="flex items-center gap-4">
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.337063703309!2d121.51677157607848!3d25.02263283874789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a996c8d54e79%3A0x29aae25c4a2addc3!2sTong&#39;an%20St%20St.Joseph&#39;s%20Catholic%20Church!5e0!3m2!1sen!2stw!4v1736305647171!5m2!1sen!2stw"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export default Contact;
