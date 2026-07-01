'use client';

import { CaretRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';

type ClickableListTypes = {
  heading: string;
  items: { id: string; label: string; onClick: () => void }[];
};

function ClickableList({ heading, items }: Readonly<ClickableListTypes>) {
  const t = useTranslations(heading);
  return (
    <ul className="flex flex-col gap-2">
      {items.map(({ id, label, onClick }) => (
        <li key={id} className="flex items-center border-b border-primary-30 cursor-pointer">
          <CaretRightOutlined className="!text-primary-50 size-2" />
          <Button
            className="!text-warmGray-800 hover:!text-primary-70 !text-left !whitespace-normal !h-auto"
            type="link"
            onClick={onClick}
          >
            {label}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default ClickableList;
