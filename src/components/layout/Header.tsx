'use client';

import React from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslations } from 'next-intl';

import Logos from '@/components/Logos';

import useCategories from '@/hooks/useCategories';
import useEvents from '@/hooks/useEvents';
import { Link } from '@/i18n/routing';

import AccountDropdown from './AccountDropdown';
import DrawerMenu from './DrawerMenu';
import LanguageSwitcher from './LanguageSwitcher';

type menuItemType = {
  key: string;
  label: string | React.ReactNode;
  children?: menuItemType;
}[];

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

  const aboutList: menuItemType = [
    { key: 'about', label: 'about' },
    { key: 'member', label: 'member' },
    { key: 'priest', label: 'priest' },
    { key: 'donate', label: 'donate' },
    { key: 'contact', label: 'contact' },
    { key: 'friendShip', label: 'friendShip' },
    { key: 'language', label: 'language' },
  ];

  const aboutListItems: MenuProps['items'] = aboutList.map(({ key, label }) => ({
    key,
    label: <Link href={`/house/${label}`}>{t(`pathname.${label}`)}</Link>,
  }));

  return (
    <div className="fixed z-30 flex w-full justify-center bg-primary text-gray-90">
      <div className="flex w-full max-w-7xl items-center justify-between px-5 py-3 font-semibold text-gray-90">
        <Logos />
        <div className="hidden items-center justify-end gap-4 md:flex lg:gap-7">
          <div className="flex items-center gap-4 lg:gap-6">
            <Dropdown
              menu={{ items: aboutListItems }}
              trigger={['click']}
              overlayClassName="!pt-5"
              className="headerLink"
            >
              <Button
                type="link"
                onClick={(e) => e.preventDefault()}
                className="!p-0 !font-semibold"
              >
                <Space>
                  {t('pathname.about')}
                  <DownOutlined className="text-[10px] font-black" />
                </Space>
              </Button>
            </Dropdown>
            <Link href="/cana" className="headerLink !p-0 !font-semibold">
              {t('pathname.cana')}
            </Link>
            <Dropdown
              menu={{ items: eventListItems }}
              trigger={['click']}
              overlayClassName="!pt-5 w-36"
              className="headerLink"
            >
              <Button
                type="link"
                onClick={(e) => e.preventDefault()}
                className="!p-0 !font-semibold"
              >
                <div className="flex gap-2">
                  {t('pathname.events')}
                  <DownOutlined className="text-[10px]" />
                </div>
              </Button>
            </Dropdown>
            <Link href="/upcoming" className="headerLink !p-0 !font-semibold">
              {t('pathname.upcoming')}
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
