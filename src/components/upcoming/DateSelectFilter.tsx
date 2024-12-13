'use client';

import { useState } from 'react';

import { DatePicker, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { upcomingDate } from '@/jotai/upcomingDate';

function DateSelectFilter() {
  const t = useTranslations();
  const { RangePicker } = DatePicker;

  const [open, setOpen] = useState<boolean>(false);
  const [selectedDateRange, setSelectedDateRange] = useAtom(upcomingDate);

  const today = dayjs();
  const oneMonthLater = today.add(1, 'month');
  const twoMonthsLater = today.add(2, 'months');

  const defaultSelectedDateRange = [today, twoMonthsLater];

  const dateFilterOption = [
    {
      label: t('upcoming.1month'),
      value: '1month',
      dateRange: [today, oneMonthLater],
    },
    {
      label: t('upcoming.2months'),
      value: '2months',
      dateRange: defaultSelectedDateRange,
    },
    {
      label: t('upcoming.customize'),
      value: 'customize',
    },
  ];

  const onSelect = (value: string) => {
    const selectItem = dateFilterOption.find((item) => item.value === value);

    if (!selectItem) {
      setSelectedDateRange(defaultSelectedDateRange);
      return;
    }

    if (selectItem.value === 'customize') {
      setOpen(true);
      return;
    }

    setSelectedDateRange(selectItem.dateRange!);
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    const endDate = dayjs()
      .year(today.year() + 1)
      .month(0)
      .date(31)
      .endOf('day');
    return current && (current < today || current > endDate);
  };

  return (
    <div className="flex w-full items-center gap-4 sm:w-auto">
      <Select
        className="min-w-full sm:min-w-48"
        options={dateFilterOption}
        defaultValue={'2months'}
        onSelect={onSelect}
        labelRender={(option) => {
          if (option?.value === 'customize') {
            return selectedDateRange.map((date) => date.format('YYYY/MM/DD')).join(' ~ ');
          }
          return option?.label;
        }}
      />
      <Modal
        open={open}
        title={t('upcoming.dateFilter')}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
        okButtonProps={{
          autoFocus: true,
          htmlType: 'submit',
        }}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          setOpen(false);
        }}
        destroyOnClose
      >
        <RangePicker
          className="w-full"
          format="YYYY-MM-DD"
          defaultValue={[today, twoMonthsLater]}
          popupClassName="[&>.ant-picker-range-wrapper]:!hidden md:[&>.ant-picker-range-wrapper]:!flex [&_.ant-picker-panels]:!flex-col md:[&_.ant-picker-panels]:!flex-row"
          onChange={(dateRange) => {
            if (!dateRange) {
              setSelectedDateRange([]);
              return;
            }
            const selectedRange = dateRange?.filter((date): date is dayjs.Dayjs => date !== null);

            setSelectedDateRange(selectedRange);
          }}
          disabledDate={disabledDate}
          allowClear
        />
      </Modal>
    </div>
  );
}

export default DateSelectFilter;
