'use client';

import { Dispatch, SetStateAction } from 'react';

import { App, Form, FormInstance, Input, Modal } from 'antd';
import { Rule } from 'antd/es/form';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import useEventsByCategoryId from '@/hooks/useEventsByCategoryId';

type EventsFormModalProps = {
  open: boolean;
  isEdit: boolean;
  form: FormInstance<EventsFormValue>;
  initialValue: EventsFormValue;
  dataSource: EventsFormValue[];
  onCancel: () => void;
  setIsFetchLoading: Dispatch<SetStateAction<boolean>>;
};

function EventsFormModal({
  open,
  isEdit,
  form,
  initialValue,
  dataSource,
  onCancel,
  setIsFetchLoading,
}: Readonly<EventsFormModalProps>) {
  const t = useTranslations();
  const { message } = App.useApp();

  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  const { mutate } = useEventsByCategoryId(categoryId);

  const onCreate = async (formData: EventsFormValue) => {
    setIsFetchLoading(true);
    try {
      await axios.post('/api/events', { ...formData, order: dataSource.length, categoryId });
      await mutate();

      message.success(t('toast.saveSuccess'));
      onCancel();
    } catch (error) {
      message.error(t('toast.saveFailed'));
    }
    setIsFetchLoading(false);
  };

  const onEditSave = async (formData: EventsFormValue) => {
    if (!initialValue._id) {
      return;
    }

    setIsFetchLoading(true);
    try {
      await axios.patch(`/api/events/${initialValue._id}`, { ...formData, categoryId });
      await mutate();

      message.success(t('toast.saveSuccess'));
      onCancel();
    } catch (error) {
      message.error(t('toast.saveFailed'));
    }
    setIsFetchLoading(false);
  };

  const onFinish = (formData: EventsFormValue) => {
    if (isEdit) {
      onEditSave(formData);
    } else {
      onCreate(formData);
    }
  };

  const formItems = [
    {
      key: 'name',
      label: t('eventsManage.title'),
      rules: [{ required: true, message: t('eventsManage.titleRule') }],
      component: <Input placeholder={t('eventsManage.title')} />,
    },
    {
      key: 'description',
      label: t('eventsManage.description'),
      component: (
        <Input.TextArea
          showCount
          maxLength={500}
          placeholder={t('eventsManage.description')}
          autoSize={{ minRows: 3, maxRows: 15 }}
        />
      ),
    },
  ];

  return (
    <div>
      <Modal
        open={open}
        title={isEdit ? '活動編輯' : t('eventsManage.formCreate')}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={onCancel}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form layout="vertical" form={form} name="form_in_modal" clearOnDestroy onFinish={onFinish}>
          {formItems.map(({ key, label, rules, component: Component }) => (
            <Form.Item
              key={key}
              name={key}
              label={label}
              rules={rules as Rule[]}
              initialValue={initialValue[key as keyof typeof initialValue]}
            >
              {Component}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
}

export default EventsFormModal;
