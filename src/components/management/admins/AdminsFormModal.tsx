'use client';

import { Dispatch, SetStateAction } from 'react';

import { App, Form, FormInstance, Input, Modal } from 'antd';
import { Rule } from 'antd/es/form';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import useAdmins from '@/hooks/useAdmins';

type AdminsFormModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  isEdit: boolean;
  form: FormInstance<AdminFormValue>;
  handleFinish: () => void;
  initialValue: AdminFormValue;
  dataSource: AdminFormValue[];
  setIsFetchLoading: Dispatch<SetStateAction<boolean>>;
};

function AdminsFormModal({
  open,
  isEdit,
  form,
  initialValue,
  dataSource,
  setOpen,
  onCancel,
  handleFinish,
  setIsFetchLoading,
}: Readonly<AdminsFormModalProps>) {
  const t = useTranslations();
  const { message } = App.useApp();
  const { mutate } = useAdmins();

  const onCreate = async (formData: AdminFormValue) => {
    setIsFetchLoading(true);
    try {
      await axios.post('/api/admins', formData);
      await mutate();

      message.success(t('toast.saveSuccess'));
      setOpen(false);
    } catch (error) {
      message.error(t('toast.saveFailed'));
    }
    setIsFetchLoading(false);
  };

  const onEditSave = async (formData: AdminFormValue) => {
    if (!initialValue._id) {
      return;
    }
    setIsFetchLoading(true);
    try {
      await axios.patch(`/api/admins/${initialValue._id}`, formData);
      await mutate();

      message.success(t('toast.saveSuccess'));
      setOpen(false);
    } catch (error) {
      message.error(t('toast.saveFailed'));
    }
    setIsFetchLoading(false);
  };

  const onFinish = async (formData: AdminFormValue) => {
    if (isEdit) {
      await onEditSave(formData);
    } else {
      await onCreate(formData);
    }
    handleFinish();
  };

  const formItems = [
    {
      key: 'name',
      label: t('admins.title'),
      rules: [{ required: true, message: t('admins.titleRule') }],
      component: <Input placeholder={t('admins.title')} />,
    },
    {
      key: 'email',
      label: t('admins.email'),
      rules: [
        { required: true, message: t('admins.emailRule'), type: 'email' },
        () => ({
          validator(rule: Rule, value: string) {
            const currentData = dataSource.find(({ email }) => email === value);
            const isCurrentData = dataSource.find(
              ({ email, _id }) => email !== value && _id === initialValue._id
            );

            if (!isEdit && currentData)
              return Promise.reject(new Error(t('admins.emailCreateExist')));
            if (isEdit && isCurrentData && currentData)
              return Promise.reject(new Error(t('admins.emailEditExist')));
            return Promise.resolve();
          },
        }),
      ],
      component: <Input type="textarea" placeholder="Google Email" />,
    },
  ];

  return (
    <div>
      <Modal
        open={open}
        title={isEdit ? t('admins.formEdit') : t('admins.formCreate')}
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
export default AdminsFormModal;
