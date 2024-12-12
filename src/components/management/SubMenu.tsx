'use client';

import { Key } from 'react';

import { DataNode } from 'antd/es/tree';
import { useTranslations } from 'next-intl';

import TreeCategory from '@/components/management/TreeCategory';

import { usePathname, useRouter } from '@/i18n/routing';

function SubMenu() {
  const t = useTranslations('');
  const pathname = usePathname();
  const router = useRouter();

  const eventsManagementList = [
    {
      title: 'events',
      key: 'events',
      disabled: true,
      children: [
        {
          title: 'categoriesManage',
          key: 'categoriesManage',
        },
        {
          title: 'eventsManage',
          key: 'eventsManage',
        },
        {
          title: 'activitiesManage',
          key: 'activitiesManage',
        },
        {
          title: 'registerManage',
          key: 'registerManage',
        },
      ],
    },
  ];

  const eventsManagementListItems: DataNode[] = eventsManagementList.map(
    ({ title: parentTitle, key: parentKey, children, disabled }) => ({
      key: parentKey,
      title: t(`management.${parentTitle}`),
      disabled,
      children: children?.map(({ title: childTitle, key: childKey }) => ({
        key: childKey,
        title: t(`management.${childTitle}`),
      })),
    })
  );

  const adminsManagementList: DataNode[] = [
    {
      title: t(`management.authority`),
      key: 'authority',
      disabled: true,
      children: [
        {
          title: t(`management.adminsManage`),
          key: 'adminsManage',
        },
      ],
    },
  ];

  const menuKeys = [...eventsManagementList, ...adminsManagementList].flatMap(({ children }) =>
    children?.map(({ key }) => key)
  );

  const selectedKey = menuKeys.find((key) => pathname.includes(key as string));
  const defaultSelectedKey = selectedKey ? [selectedKey] : [];

  const handleSelect = (keys: Key[]) => {
    if (keys.length > 0) {
      router.push(`/management/system/${keys}`);
    }
  };

  return (
    <>
      <TreeCategory
        treeData={eventsManagementListItems}
        pageTitle="management"
        onSelect={handleSelect}
        selectedKeys={defaultSelectedKey}
      />
      <TreeCategory
        treeData={adminsManagementList}
        pageTitle="settings"
        onSelect={handleSelect}
        selectedKeys={defaultSelectedKey}
      />
    </>
  );
}

export default SubMenu;
