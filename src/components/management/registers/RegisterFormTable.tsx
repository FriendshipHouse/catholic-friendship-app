'use client';

import { useState } from 'react';

import { Checkbox, Table, TableColumnsType, TableProps } from 'antd';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import uniqBy from 'lodash/uniqBy';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import useRegistrations, { Registration } from '@/hooks/useRegistrations';
import { registrationSelectionRows } from '@/jotai/managementRegistration';

type OnChange = NonNullable<TableProps<any>['onChange']>;
type Filters = Parameters<OnChange>[1];

function RegisterFormTable() {
  const t = useTranslations();
  const [selectionRows, setSelectionRows] = useAtom(registrationSelectionRows);
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});

  const searchParams = useSearchParams();

  const categoryId = searchParams.get('categoryId') ?? '';
  const eventId = searchParams.get('eventId') ?? '';

  const { data: registrations = [], isLoading: isRegistrationLoading } = useRegistrations({
    categoryId,
    eventId,
  });

  const registerTable = registrations.map((register) => ({
    ...register,
    key: register._id,
    birthday: register.birthday ?? '-',
    id: register.id ?? '-',
    submissionTime: dayjs(register.submissionTime).format('YYYY/MM/DD - HH:MM'),
    sharePicture: register.sharePicture ? t(`registerManage.yes`) : t(`registerManage.no`),
    knowInfo: [
      register.knowInfo
        .map((info) => (info !== 'others' ? t(`register.${info}`) : register.otherKnowInfo))
        .join(', '),
    ],
    beenHere: register.beenHere ? t(`registerManage.yes`) : t(`registerManage.no`),
    parish: register.parish === '' ? '-' : register.parish,
  }));

  const columns: TableColumnsType<Registration> = [
    {
      title: t('activities.title'),
      dataIndex: 'activityName',
      key: 'activityName',
      className: 'min-w-[140px]',
    },
    {
      title: t('register.date'),
      dataIndex: 'date',
      key: 'date',
      filters: uniqBy(registerTable ?? [], 'date')?.map(({ date }) => ({
        text: date,
        value: date,
      })),
      filteredValue: filteredInfo.date || null,
      onFilter: (value, record) => record.date.includes(value as string),
      className: 'min-w-[110px]',
    },
    {
      title: t('register.submissionTime'),
      dataIndex: 'submissionTime',
      key: 'submissionTime',
      className: 'min-w-[110px]',
    },
    {
      title: t('register.fullName'),
      dataIndex: 'fullName',
      key: 'fullName',
      className: 'min-w-[90px]',
    },
    {
      title: t('register.email'),
      dataIndex: 'email',
      key: 'email',
      filters: uniqBy(registerTable ?? [], 'email')?.map(({ email }) => ({
        text: email,
        value: email,
      })),
      filteredValue: filteredInfo.email || null,
      onFilter: (value, record) => record.email.includes(value as string),
      className: 'min-w-[90px]',
    },
    {
      title: t('register.birthday'),
      dataIndex: 'birthday',
      key: 'birthday',
      className: 'min-w-[90px]',
    },
    {
      title: t('register.id'),
      dataIndex: 'id',
      key: 'id',
      className: 'min-w-[100px]',
    },
    {
      title: t('register.phone'),
      dataIndex: 'phone',
      key: 'phone',
      className: 'min-w-[100px]',
    },
    {
      title: t('register.lineId'),
      dataIndex: 'lineId',
      key: 'lineId',
      className: 'min-w-[100px]',
    },
    {
      title: t('register.parish'),
      dataIndex: 'parish',
      key: 'parish',
      className: 'min-w-[100px]',
    },
    {
      title: t('registerManage.sharePictureColumn'),
      dataIndex: 'sharePicture',
      key: 'sharePicture',
      className: 'min-w-[100px]',
    },
    {
      title: t('registerManage.knowInfoColumn'),
      dataIndex: 'knowInfo',
      key: 'knowInfo',
      className: 'min-w-[100px]',
    },
    {
      title: t('registerManage.beenHereColumn'),
      dataIndex: 'beenHere',
      key: 'beenHere',
      className: 'min-w-[100px]',
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectionRows,
    onChange: setSelectionRows,
  };

  const defaultCheckboxList = columns.map((item) => item.key);
  const [checkboxList, setCheckboxList] = useState(defaultCheckboxList);
  const checkboxOptions = columns.map(({ key, title }) => ({ label: title, value: key }));
  const tableColumns = columns.map((item) => ({
    ...item,
    hidden: !checkboxList.includes(item.key as string),
  }));

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <Checkbox.Group
          value={checkboxList}
          options={checkboxOptions as any}
          onChange={setCheckboxList}
        />
      </div>
      <Table
        columns={tableColumns}
        rowSelection={rowSelection}
        loading={isRegistrationLoading}
        dataSource={registerTable}
        onChange={handleChange}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}

export default RegisterFormTable;
