'use client';

import { useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { App, Button, Checkbox, Empty, Form, Popconfirm, Popover, Table } from 'antd';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import useActivities from '@/hooks/useActivities';
import useCategories from '@/hooks/useCategories';
import useEventsByCategoryId from '@/hooks/useEventsByCategoryId';
import useImages from '@/hooks/useImages';
import { activitySelectionRows } from '@/jotai/managementActivity';

import AddActivityFormModal from './AddActivityFormModal';
import EditActivityFormModal from './EditActivityFormModal';

const INITIAL_VALUE: ActivitiesFormValue = {
  categoryId: '',
  eventId: '',
  name: '',
  date: '',
  time: [null, null],
  location: '',
  description: '',
  image: '',
  registerType: 'google',
  googleFormLink: '',
  systemFormInfo: {
    extraFields: [],
    dueDate: 'day',
    detail: '',
    notice: '',
  },
  _id: '',
};

function ActivitiesFormTable() {
  const t = useTranslations();
  const { message } = App.useApp();
  const [form] = Form.useForm<ActivitiesFormValue>();

  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  const { isLoading: isCategoriesLoading } = useCategories();
  const { isLoading: isEventsLoading } = useEventsByCategoryId(categoryId);
  const eventId = searchParams.get('eventId');

  const [open, setOpen] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<ActivitiesFormValue>(INITIAL_VALUE);
  const [selectionRows, setSelectionRows] = useAtom(activitySelectionRows);

  const {
    data: activities = [],
    isLoading: isActivitiesLoading,
    mutate,
  } = useActivities(categoryId, eventId);

  const { data: activityImages = [], isLoading: isActivityImagesLoading } =
    useImages('activities/images');

  const isLoading =
    isActivitiesLoading ||
    isActivityImagesLoading ||
    isFetchLoading ||
    isCategoriesLoading ||
    isEventsLoading;

  const handleCreate = () => {
    setOpen(true);
    setCurrentFormData(INITIAL_VALUE);
    setIsEdit(false);
  };

  const handleDelete = async ({ _id }: ActivitiesFormValue) => {
    if (!_id) {
      return;
    }
    setIsFetchLoading(true);
    try {
      await axios.delete('/api/activities', { data: [_id] });
      await mutate();

      message.success(t('toast.deleteSuccess'));
      setOpen(false);
    } catch (error) {
      message.error(t('toast.deleteFailed'));
    }

    setIsFetchLoading(false);
  };

  const handleEdit = ({ date }: ActivitiesFormValue) => {
    const formData = [...activities].find((item) => date === item.date);
    setCurrentFormData(formData ?? INITIAL_VALUE);

    setOpen(true);
    setIsEdit(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setIsEdit(false);
    setCurrentFormData(INITIAL_VALUE);
  };

  const columns = [
    {
      title: t('activities.title'),
      dataIndex: 'name',
      key: 'name',
      className: 'min-w-[140px]',
    },
    {
      title: t('activities.date'),
      dataIndex: 'date',
      key: 'date',
      className: 'min-w-[110px]',
    },
    {
      title: t('activities.time'),
      dataIndex: 'time',
      key: 'time',
      className: 'min-w-[100px]',
      render: (time: string[]) => {
        return time.join(' - ');
      },
    },
    {
      title: t('activities.location'),
      dataIndex: 'location',
      key: 'location',
      className: 'min-w-[100px]',
    },
    {
      title: t('activities.description'),
      dataIndex: 'description',
      key: 'description',
      className: 'min-w-[200px]',
    },
    {
      title: t('activities.image'),
      dataIndex: 'image',
      key: 'image',
      className: 'min-w-[80px]',
      render: (_: any, { image }: ActivitiesFormValue) => {
        const { url = '' } =
          activityImages.find((imageInfo) => {
            const filename = (imageInfo?.pathname ?? '').split('/').pop();
            return filename === image;
          }) ?? {};

        return (
          <div className="flex items-center gap-4">
            {url && (
              <Popover
                placement="bottom"
                content={
                  <Image
                    priority
                    src={url}
                    alt="Image"
                    width={300}
                    height="0"
                    className="h-auto w-full max-w-[160px]"
                  />
                }
              >
                <Image
                  priority
                  src={url}
                  alt="Image"
                  width={300}
                  height="0"
                  className="h-auto w-full max-w-[44px]"
                />
              </Popover>
            )}
          </div>
        );
      },
    },
    {
      title: t('activities.registerType'),
      dataIndex: 'registerType',
      key: 'registerType',
      className: 'min-w-[70px]',
      render: (type: string) => {
        const label =
          {
            google: t('activities.googleFormLink'),
            system: t('activities.systemForm'),
          }[type] ?? '-';

        return label;
      },
    },
    {
      title: t('activities.operation'),
      dataIndex: 'operation',
      key: 'operation',
      className: 'min-w-[100px]',
      render: (_: any, formData: ActivitiesFormValue) => (
        <div className="flex gap-4">
          <Button type="link" onClick={() => handleEdit(formData)} className="flex gap-2 !p-0">
            <EditOutlined />
            {t('common.edit')}
          </Button>
          <Popconfirm
            title={t('activities.popConfirmTitle')}
            description={t('activities.popConfirmDescription')}
            onConfirm={() => handleDelete(formData)}
            okText={t('popConfirm.okButton')}
            cancelText={t('popConfirm.cancelButton')}
          >
            <Button type="link" className="flex gap-2 !p-0">
              <DeleteOutlined />
              {t('common.delete')}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const footer = () => (
    <Button
      type="link"
      className="!p-0 !text-primary-70 hover:!text-primary"
      onClick={handleCreate}
    >
      + {t('activities.formCreate')}
    </Button>
  );

  const defaultCheckboxList = columns.map((item) => item.key);
  const [checkboxList, setCheckboxList] = useState(defaultCheckboxList);

  const activitiesTable = activities.map((activities) => ({
    key: activities._id,
    ...activities,
  }));

  const rowSelection = {
    selectedRowKeys: selectionRows,
    onChange: setSelectionRows,
  };

  const checkboxOptions = columns.map(({ key, title }) => ({ label: title, value: key }));

  const tableColumns = columns.map((item) => ({
    ...item,
    hidden: !checkboxList.includes(item.key as string),
  }));

  const expandedRowRender = (formData: ActivitiesFormValue) => {
    const { googleFormLink, systemFormInfo } = formData ?? {};
    const { dueDate, extraFields = [], detail, notice } = systemFormInfo ?? {};

    return (
      <div>
        <div className="flex flex-col gap-4">
          {googleFormLink && (
            <div className="flex gap-1">
              <div className="font-bold">{t(`activities.googleFormLink`)}: </div>
              <div>{googleFormLink}</div>
            </div>
          )}

          {dueDate && (
            <div className="flex gap-1">
              <div className="font-bold">{t(`activities.dueDate`)}: </div>
              <div>{t(`activities.${dueDate}`)}</div>
            </div>
          )}

          {extraFields && extraFields?.length > 0 && (
            <div className="flex gap-1">
              <div className="font-bold">{t(`activities.extraFields`)}: </div>
              {extraFields.map((item) => t(`activities.${item}`)).join(', ')}
            </div>
          )}

          {detail && (
            <div className="flex gap-1">
              <div className="font-bold">{t(`activities.registerDetail`)}:</div>
              <div className="">{detail}</div>
            </div>
          )}

          {notice && (
            <div className="flex gap-1">
              <div className="font-bold">{t(`activities.registerNotice`)}: </div>
              <div className="">{notice}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const emptyText = () => {
    const text = t('emptyText.activity');
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={text} />;
  };

  return (
    <div className="flex flex-col gap-4">
      <Checkbox.Group value={checkboxList} options={checkboxOptions} onChange={setCheckboxList} />
      <Table
        dataSource={activitiesTable}
        columns={tableColumns}
        rowSelection={rowSelection}
        loading={isLoading}
        expandable={{ expandedRowRender, expandIconColumnIndex: 7 }}
        locale={{ emptyText }}
        footer={footer}
        scroll={{ x: 1024 }}
        className="max-w-xl"
      />
      {isEdit ? (
        <EditActivityFormModal
          open={open}
          form={form}
          initialValue={currentFormData}
          onCancel={onCloseModal}
          isLoading={isLoading}
          setIsFetchLoading={setIsFetchLoading}
        />
      ) : (
        <AddActivityFormModal
          open={open}
          form={form}
          initialValue={currentFormData}
          dataSource={activities}
          onCancel={onCloseModal}
          isLoading={isLoading}
          setIsFetchLoading={setIsFetchLoading}
        />
      )}
    </div>
  );
}

export default ActivitiesFormTable;
