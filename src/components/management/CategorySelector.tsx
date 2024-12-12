import { Select } from 'antd';
import { useSearchParams } from 'next/navigation';

import useCategories from '@/hooks/useCategories';
import useEvents from '@/hooks/useEvents';
import { usePathname, useRouter } from '@/i18n/routing';

type CategorySelectorProps = {
  onChange?: (value: string) => void;
};

function CategorySelector({ onChange }: Readonly<CategorySelectorProps>) {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categoryId = searchParams.get('categoryId');

  const { data: categories = [], isLoading } = useCategories();
  const { data: events = [] } = useEvents();
  const categoryOptions = categories.map(({ name, _id }) => ({ value: _id, label: name }));

  const handleSelect = (value: string) => {
    const { _id: eventId = '' } = events?.filter((event) => event?.categoryId === value)?.[0] ?? '';

    const params = new URLSearchParams();

    params.set('categoryId', value);

    if (pathname.includes('activitiesManage')) {
      params.set('eventId', eventId);
    }

    push(`${pathname}?${params.toString()}`);

    if (onChange) onChange(value);
  };

  const selected =
    categoryOptions?.find((option) => option?.value === categoryId)?.value ??
    categoryOptions?.[0]?.value ??
    null;

  return (
    <Select
      style={{ width: 180 }}
      value={selected}
      options={categoryOptions}
      loading={isLoading}
      disabled={!selected}
      onChange={handleSelect}
    />
  );
}

export default CategorySelector;
