'use client';

import dayjs from 'dayjs';
import { useLocale } from 'next-intl';

type DateFormatType = {
  date: string | string[];
  isTableList?: boolean;
  isModal?: boolean;
};

function DateFormat({ date, isTableList, isModal }: Readonly<DateFormatType>) {
  const locale = useLocale();

  const validDate = Array.isArray(date) ? date[0] : date;
  const dateDayJs = dayjs(validDate);

  let month = '';
  let day = '';
  let week = '';

  if (locale === 'zh-TW') {
    month = dateDayJs.format('MM') + '月';
    day = dateDayJs.format('DD');
    week = ['日', '一', '二', '三', '四', '五', '六'][dateDayJs.day()];
  } else if (locale === 'en-US') {
    month = dateDayJs.format('MMM').toUpperCase();
    day = dateDayJs.format('DD');
    week = dateDayJs.format('ddd').toUpperCase();
  }

  return (
    <div className="h-15">
      {(isTableList && (
        <div className="flex w-full items-center gap-2">
          <div>{month}</div>
          <div className="text-primary">{day}</div>
          <div className="h-3 border-r border-solid"></div>
          <div>{week}</div>
        </div>
      )) ??
        (isModal && (
          <div className="flex items-end">
            <div className="flex max-w-20 flex-col justify-center text-center">
              <div className="h-5 w-max text-xl font-bold">{month}</div>
              <div className="h-9 text-[28px] font-bold text-primary">{day}</div>
            </div>
            <div className="h-15 flex items-end text-base">({week})</div>
          </div>
        )) ??
        ''}
    </div>
  );
}

export default DateFormat;
