import { Tabs } from 'antd';
import { useSearchParams } from 'next/navigation';

import useEventsByCategoryId from '@/hooks/useEventsByCategoryId';
import { usePathname, useRouter } from '@/i18n/routing';

type EventSelectorProps = {
  onChange?: (value: string) => void;
};

function EventSelector({ onChange }: Readonly<EventSelectorProps>) {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categoryId = searchParams.get('categoryId');
  const eventId = searchParams.get('eventId');

  const { data: events = [] } = useEventsByCategoryId(categoryId);
  const tabItems = events.map(({ _id, name }) => ({ label: name, key: _id }));

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('eventId', value);
    push(`${pathname}?${params.toString()}`);

    if (onChange) onChange(value);
  };

  const selected =
    tabItems?.find((option) => option?.key === eventId)?.key ?? tabItems?.[0]?.key ?? null;

  return (
    tabItems.length > 0 && (
      <Tabs
        className="[&_.ant-tabs-nav]:!mb-0 [&_.ant-tabs-tab]:!pb-[10px] [&_.ant-tabs-tab]:!pt-0"
        items={tabItems}
        onChange={handleSelect}
        activeKey={selected}
      />
    )
  );
}

export default EventSelector;
