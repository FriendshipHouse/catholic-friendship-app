'use client';

import React from 'react';

import { Button } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { GeoAlt, House, TruckFront } from 'react-bootstrap-icons';

const carParking = [
  {
    parkingLot: 'parking1',
    mapHref: 'https://maps.app.goo.gl/XoDfuwo9a4bhmwtr9',
  },
  {
    parkingLot: 'parking2',
    mapHref: 'https://maps.app.goo.gl/DjdPddrfBdrqozqY8',
  },
  {
    parkingLot: 'parking3',
    mapHref: 'https://maps.app.goo.gl/qBw4xFKjM75XKoQG6',
  },
];

function Contact() {
  const t = useTranslations('houseContact');
  const locale = useLocale();

  const carContent = (
    <div className="w-full flex flex-col gap-1">
      <div>{t('carDescription')}</div>
      <div>{t('carParking')}</div>
      {carParking.map(({ parkingLot, mapHref }) => (
        <div className="flex gap-1 items-center" key={parkingLot}>
          <Button
            type="text"
            target="_blank"
            href={mapHref}
            className="!text-sm !pr-2 !pl-0 !text-primary-70"
          >
            <GeoAlt />
          </Button>
          {t(parkingLot)}
        </div>
      ))}
    </div>
  );
  const contactList = [
    {
      value: 'contact',
      icon: <House />,
      children: [
        {
          title: 'phone',
          content: '(02) 2314-1833',
        },
        {
          title: 'email',
          content: 'friendyoung23141833@gmail.com',
        },
        {
          title: 'address',
          content: t('addressContent'),
        },
        {
          title: 'mass',
          content: t('massContent'),
        },
      ],
    },
    {
      value: 'transport',
      icon: <TruckFront />,
      children: [
        {
          title: 'mrt',
          content: t('mrtContent'),
        },
        {
          title: 'bus',
          content: t('busContent'),
        },
        {
          title: 'car',
          content: carContent,
        },
      ],
    },
  ];

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
                <div key={title} className="flex flex-col gap-2 whitespace-pre-wrap leading-6 pt-2">
                  <div className="w-full flex items-center gap-4">
                    <div className={`${locale === 'zh-TW' ? 'w-8 min-w-8' : 'w-20'} font-bold`}>
                      {t(title)}
                    </div>
                    <div className="w-full text-gray-60 text-start">{content}</div>
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
