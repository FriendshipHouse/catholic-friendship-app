'use client';

import { Button } from 'antd';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { usePathname, useSearchParams } from 'next/navigation';
import * as XLSX from 'xlsx';

import useRegistrations from '@/hooks/useRegistrations';
import { registrationSelectionRows } from '@/jotai/managementRegistration';

function ExportRegistrationsButton() {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const categoryId = searchParams.get('categoryId') ?? '';
  const eventId = searchParams.get('eventId') ?? '';

  const { data: registrations = [] } = useRegistrations({ categoryId, eventId });

  const isShow = pathname.includes('registerManage');

  const [selectionRows] = useAtom(registrationSelectionRows);

  const handleExport = () => {
    const filterRegistrationBySelectionRows = registrations.filter(({ _id }) =>
      selectionRows.includes(_id)
    );

    const knowInfoMapping = {
      bulletin: '堂區公佈欄',
      web: '網站',
      lineGroup: 'Line 群組',
      friends: '親友介紹',
      apostles: '婚姻使徒邀請',
    };

    const exportRegistrations = filterRegistrationBySelectionRows.map((registration) => {
      return {
        事件名稱: registration.activityName,
        事件日期: registration.date,
        事件時間: (registration.time ?? []).join(' - '),
        事件地點: registration.location ?? '-',
        姓名: registration.fullName,
        Email: registration.email,
        生日: registration.birthday ?? '-',
        身分證字號: registration.id ?? '-',
        電話: registration.phone,
        LineId: registration.lineId ?? '-',
        堂區: registration.parish,
        分享照片: registration.sharePicture ? 'Yes' : 'No',
        來源: (registration.knowInfo ?? [])
          .map(
            (key) =>
              knowInfoMapping[key as keyof typeof knowInfoMapping] ??
              registration?.otherKnowInfo ??
              ''
          )
          ?.join(', '),
        報名時間:
          (registration.sharePicture &&
            dayjs(registration.submissionTime).format('YYYY-MM-DD HH:mm:ss')) ??
          '-',
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportRegistrations);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const csvOutput = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });

    const downloadDate = dayjs(new Date()).format('YYYY/MM/DD-HH:mm:ss');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `registrations-${downloadDate}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    isShow && (
      <Button type="primary" disabled={selectionRows?.length === 0} onClick={handleExport}>
        匯出表單
      </Button>
    )
  );
}

export default ExportRegistrationsButton;
