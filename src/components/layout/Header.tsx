'use client';

import React from 'react';

import type { MenuProps } from 'antd';
import { useTranslations } from 'next-intl';

import Logos from '@/components/Logos';

import useCategories from '@/hooks/useCategories';
import useEvents from '@/hooks/useEvents';
import { Link } from '@/i18n/routing';

import AccountDropdown from './AccountDropdown';
import DrawerMenu from './DrawerMenu';
import LanguageSwitcher from './LanguageSwitcher';
import NavDropdown from './NavDroopdown';

function PageHeader() {
  const t = useTranslations();

  const { data: categories = [] } = useCategories();
  const { data: events = [] } = useEvents();

  const eventList = categories.map(({ _id: categoryId, name: categoryName }) => {
    const currentEvents = events.filter((event) => event.categoryId === categoryId);
    return {
      key: categoryId,
      label: categoryName,
      children: currentEvents.map(({ _id: eventId, name: eventName }) => ({
        key: eventId,
        label: <Link href={`/events/${eventId}`}>{eventName}</Link>,
      })),
    };
  });
  const eventListItems = [
    { key: 'activities', label: <Link href={`/events`}>{t(`pathname.activities`)}</Link> },
    ...eventList,
  ];

  const aboutKeys = ['about', 'member', 'priest', 'contact', 'friendship'];

  const aboutListItems: MenuProps['items'] = aboutKeys.map((key) => ({
    key,
    label: <Link href={`/house/${key}`}>{t(`pathname.${key}`)}</Link>,
  }));

  const canaKeys = ['canaAbout', 'statement', 'milestone', 'donate', 'grow', 'prayer', 'testimony'];

  const canaListItems: MenuProps['items'] = canaKeys.map((key) => ({
    key,
    label: <Link href={`/cana/${key}`}>{t(`pathname.${key}`)}</Link>,
  }));

  return (
    <div className="fixed z-30 flex w-full justify-center bg-primary text-gray-90">
      <div className="flex w-full max-w-7xl items-center justify-between px-5 py-3 font-semibold text-gray-90">
        <Logos />
        <div className="hidden items-center justify-end gap-4 md:flex lg:gap-7">
          <div className="flex items-center gap-4 lg:gap-6">
            <NavDropdown label={t('pathname.about')} items={aboutListItems} />

            <NavDropdown label={t('pathname.cana')} items={canaListItems} />

            <NavDropdown
              label={t('pathname.events')}
              items={eventListItems}
              overlayClassName="!pt-5 w-36"
            />

            <Link
              href="https://taipeipeo.catholic.org.tw/family"
              className="headerLink !p-0 !font-semibold"
            >
              {t('pathname.familyEvents')}
            </Link>
          </div>
          <div className="h-3 border-l text-primary-70" />
          <div className="flex items-center gap-4 lg:gap-6">
            <LanguageSwitcher />
            <AccountDropdown />
          </div>
        </div>
        <div className="flex items-center justify-end md:hidden">
          <DrawerMenu />
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
