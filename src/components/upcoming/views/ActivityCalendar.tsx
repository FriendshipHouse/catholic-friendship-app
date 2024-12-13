'use client';

import { useState } from 'react';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Calendar, CalendarProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useSetAtom } from 'jotai';
import { useLocale } from 'next-intl';

import { activityModal } from '@/jotai/activityModal';

type ActivityCalendarType = {
  activities: ActivitiesFormValue[];
};

type HeaderRenderType = {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
};

function ActivityCalendar({ activities }: Readonly<ActivityCalendarType>) {
  const locale = useLocale();

  const today = dayjs().format('YYYY/MM/DD');

  const setOpenModal = useSetAtom(activityModal);
  const [panelChangeDate, setPanelChangeDate] = useState<Dayjs>(dayjs(today));

  const validRange: [Dayjs, Dayjs] = [dayjs(), dayjs().add(1, 'year').month(0).date(31)];
  const [validStartDate, validEndDate] = validRange;

  dayjs.extend(isBetween);

  const dateCellRender = (dateValue: Dayjs) => {
    if (!dateValue) return null;
    if (!dateValue.isValid()) return null;
    if (!dateValue.isSame(panelChangeDate, 'month')) return null;
    if (!dateValue.isBetween(validStartDate, validEndDate)) return null;

    const listData = activities.filter(
      ({ date }) => !Array.isArray(date) && dayjs(date).isSame(dateValue, 'day')
    );

    return listData.map((activityData) => (
      <Button
        type="text"
        key={activityData._id}
        onClick={() => {
          setOpenModal({ open: true, activityData });
        }}
        className="!h-fit !text-wrap !p-0 !text-left !gap-2 !items-start !pb-1"
      >
        <div className="bg-primary h-[6px] w-[6px] rounded-[3px] ml-1 mt-2 md:flex hidden" />
        <div className="w-full text-xs">{activityData.name}</div>
      </Button>
    ));
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  const onPanelChange = (newDate: Dayjs) => {
    setPanelChangeDate(newDate);
  };

  const headerRender = ({ value, onChange }: HeaderRenderType) => {
    const year = value.year();
    const month = value.month();

    const isPrevMonthDisable = !value
      .clone()
      .subtract(1, 'month')
      .isBetween(validStartDate, validEndDate, 'month', '[]');
    const isNextMonthDisable = !value
      .clone()
      .add(1, 'month')
      .isBetween(validStartDate, validEndDate, 'month', '[]');

    const headerTitle =
      locale === 'zh-TW' ? `${year} 年 ${month + 1} 月` : `${value.format('MMMM')}  ${year}`;

    return (
      <div className="m-10 flex items-center justify-center gap-10">
        <Button
          type="text"
          icon={<LeftOutlined className="!text-primary" />}
          onClick={() => onChange(value.clone().subtract(1, 'month'))}
          disabled={isPrevMonthDisable}
        />
        <div className="text-xl font-bold">{headerTitle}</div>
        <Button
          type="text"
          icon={<RightOutlined className="!text-primary" />}
          onClick={() => onChange(value.clone().add(1, 'month'))}
          disabled={isNextMonthDisable}
        />
      </div>
    );
  };

  return (
    <div>
      <Calendar
        value={panelChangeDate}
        cellRender={cellRender}
        onPanelChange={onPanelChange}
        validRange={validRange}
        headerRender={headerRender}
      />
    </div>
  );
}

export default ActivityCalendar;
