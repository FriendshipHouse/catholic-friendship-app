import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
import { useTranslations } from 'next-intl';

type ActivitiesInputSearchProps = {
  loading: boolean;
  onChange: (keyword: string) => void;
};

function ActivitiesInputSearch({ loading, onChange }: Readonly<ActivitiesInputSearchProps>) {
  const t = useTranslations();

  const handleDebounceSearch = debounce((event) => onChange(event?.target?.value), 200);

  return (
    <Input.Search
      variant="borderless"
      className="[&_.ant-btn-default]:!hidden [&_.ant-input-group-addon:first-child]:!w-9 [&_.ant-input-wrapper]:flex [&_.ant-input-wrapper]:justify-end [&_.ant-input]:!p-0 [&_input:focus]:!w-full [&_input]:!w-10"
      placeholder={t('upcoming.search')}
      addonBefore={<SearchOutlined className="flex h-full w-full items-center" />}
      maxLength={25}
      loading={loading}
      onChange={handleDebounceSearch}
    />
  );
}

export default ActivitiesInputSearch;
