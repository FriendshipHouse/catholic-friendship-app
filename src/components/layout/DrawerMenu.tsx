'use client';

import { useState } from 'react';

import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu, MenuProps, Select } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';

import useAdmins from '@/hooks/useAdmins';
import useCategories from '@/hooks/useCategories';
import useEvents from '@/hooks/useEvents';
import { Link, locales, usePathname, useRouter } from '@/i18n/routing';

import Logos from '../Logos';

type LevelKeysProps = {
  key?: string;
  children?: LevelKeysProps[];
};

const aboutList = [
  { value: 'about' },
  { value: 'member' },
  { value: 'priest' },
  { value: 'donate' },
  { value: 'contact' },
  { value: 'friendship' },
  { value: 'language' },
];

function DrawerMenu() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [stateOpenKeys, setStateOpenKeys] = useState(['']);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { status, data: session } = useSession();
  const { email } = session?.user ?? {};
  const isLogin = status === 'authenticated';
  const { data: admins = [], isLoading: isAdminsLoading } = useAdmins();

  const isAdminAccount = !isAdminsLoading && admins.some((admin) => admin.email === email);

  const { data: categories = [] } = useCategories();
  const { data: events = [] } = useEvents();

  const eventList = categories.map(({ _id: categoryId, name: categoryName }) => {
    const currentEvents = events.filter((event) => event.categoryId === categoryId);

    return {
      key: categoryId,
      label: <div>{categoryName}</div>,
      children: currentEvents.map(({ _id: eventId, name: eventName }) => ({
        key: eventId,
        label: <Link href={`/events/${eventId}`}>{eventName}</Link>,
      })),
    };
  });

  const aboutListItems = aboutList.map(({ value }) => ({
    key: value,
    label: (
      <Link href={`/house/${value}`} className="darkGrayLink">
        {t(`pathname.${value}`)}
      </Link>
    ),
  }));

  const eventListItems = [
    { key: 'activities', label: <Link href={`/events`}>{t(`pathname.activities`)}</Link> },
    ...eventList,
  ];

  const menuItem: MenuProps['items'] = [
    {
      key: 'house',
      label: t(`pathname.about`),
      children: aboutListItems,
    },
    {
      key: 'cana',
      label: (
        <Link href="/cana" className="darkGrayLink">
          {t(`pathname.cana`)}
        </Link>
      ),
    },
    {
      key: 'events',
      label: t(`pathname.events`),
      children: eventListItems,
    },
    {
      key: 'upcoming',
      label: (
        <Link href="/upcoming" className="darkGrayLink">
          {t(`pathname.upcoming`)}
        </Link>
      ),
    },
  ];

  const localeItems = locales.map((localeKey) => ({
    value: localeKey,
    label: t(`locale.${localeKey}`),
  }));

  const accountLogIn: MenuProps['items'] = [
    { key: 'user', label: <Link href="/user">{t('account.user')}</Link> },
    { key: 'management', label: <Link href="/management">{t('account.managePage')}</Link> },
    {
      key: 'signOut',
      label: (
        <Button
          type="link"
          onClick={() => signOut()}
          className="!p-0 !text-gray-80 hover:!text-primary-80"
        >
          {t('account.signOut')}
        </Button>
      ),
    },
  ];

  const accountLogOut: MenuProps['items'] = [
    {
      key: 'signIn',
      label: (
        <Button
          type="link"
          onClick={() => signIn('google')}
          className="!p-0 !text-gray-80 hover:!text-primary-80"
        >
          {t('account.signIn')}
        </Button>
      ),
    },
  ];

  const accountLogic = () => {
    if (isLogin) {
      return isAdminAccount
        ? accountLogIn
        : accountLogIn.filter((item) => item?.key !== 'management');
    }
    return accountLogOut;
  };

  const accountItems: MenuProps['items'] = [
    {
      key: 1,
      label: t('menu.userInformation'),
      type: 'group',
      children: accountLogic(),
    },
  ];

  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };
  const levelKeys = getLevelKeys(menuItem as LevelKeysProps[]);

  const onMenuOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <div>
      <Button
        type="link"
        icon={<MenuOutlined />}
        className="!text-primary-110 hover:!text-primary-80"
        onClick={() => setDrawerOpen(true)}
      />
      <Drawer
        placement="right"
        closable={false}
        open={drawerOpen}
        className="[&>.ant-drawer-body]:!p-0"
        onClose={() => setDrawerOpen(false)}
      >
        <div className="w-full">
          <div className="flex w-full justify-between bg-primary px-8 py-3">
            <Logos />
            <Button
              type="link"
              onClick={() => setDrawerOpen(false)}
              icon={<MenuOutlined />}
              className="!text-primary-110 hover:!text-primary-80"
            />
          </div>
          <div className="p-3 flex gap-2 flex-col">
            <Menu
              mode="inline"
              className="w-full !border-0"
              items={menuItem}
              defaultOpenKeys={[]}
              openKeys={stateOpenKeys}
              selectedKeys={[]}
              onOpenChange={onMenuOpenChange}
              onClick={() => {
                setStateOpenKeys([]);
                setDrawerOpen(false);
              }}
            />
            <div className="border-b border-gray-30" />
            <div className="px-4 py-3 flex flex-col gap-4">
              <div className="text-gray-80/45">{t(`menu.languageSwitch`)}</div>
              <Select
                defaultValue={t(`locale.${locale}`)}
                onChange={(key) => {
                  router.replace({ pathname }, { locale: key });
                }}
                options={localeItems}
                className="w-full"
              />
            </div>
            <div className="border-b border-gray-30" />
            <Menu mode="inline" className="w-full !border-0" items={accountItems} />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default DrawerMenu;
