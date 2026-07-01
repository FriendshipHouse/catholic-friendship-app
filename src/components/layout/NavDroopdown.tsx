'use client';

import React from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

type NavDropdownProps = {
  label: React.ReactNode;
  items: MenuProps['items'];
  overlayClassName?: string;
};

function NavDropdown({ label, items, overlayClassName }: Readonly<NavDropdownProps>) {
  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      overlayClassName={overlayClassName ?? '!pt-5'}
      className="headerLink"
    >
      <Button type="link" onClick={(e) => e.preventDefault()} className="!p-0 !font-semibold">
        <Space size={4}>
          {label}
          <DownOutlined className="text-[10px] font-black" />
        </Space>
      </Button>
    </Dropdown>
  );
}

export default NavDropdown;
