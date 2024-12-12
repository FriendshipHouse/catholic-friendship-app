'use client';

import { Dispatch, SetStateAction } from 'react';

import { App, Form, FormInstance, Input, Modal } from 'antd';
import { Rule } from 'antd/es/form';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import useCategories from '@/hooks/useCategories';

import DropdownImages from '../DropdownImages';

type CategoriesFormModalProps = {
  open: boolean;
  isEdit: boolean;
  form: FormInstance<CategoriesFormValue>;
  initialValue: CategoriesFormValue;
  dataSource: CategoriesFormValue[];
  onCancel: () => void;
  setIsFetchLoading: Dispatch<SetStateAction<boolean>>;
};

function CategoriesFormModal({
  open,
  isEdit,
  form,
  initialValue,
  dataSource,
  onCancel,
  setIsFetchLoading,
}: Readonly<CategoriesFormModalProps>) {
  const t = useTranslations();
  const { message } = App.useApp();
  const { mutate } = useCategories();

  const onCreate = async (formData: CategoriesFormValue) => {
    setIsFetchLoading(true);

    try {
      await axios.post('/api/categories', { ...formData, order: dataSource.length });
      await mutate();

      message.success(t('toast.saveSuccess'));
      onCancel();
    } catch (error) {
      message.error(t('toast.saveFailed'));
    }
    setIsFetchLoading(false);
  };

  const onEditSave = async (formData: CategoriesFormValue) => {
    if (!initialValue._id) {
      return;
    }
    setIsFetchLoading(true);
    try {
      await axios.patch(`/api/categories/${initialValue._id}`, formData);
      await mutate();

      message.success(t('toast.saveSuccess'));
      onCancel();
    } catch (error) {
      message.success(t('toast.saveFailed'));
    }
    setIsFetchLoading(false);
  };

  const onFinish = (formData: CategoriesFormValue) => {
    if (isEdit) {
      onEditSave(formData);
    } else {
      onCreate(formData);
    }
  };

  const formItems = [
    {
      key: 'name',
      label: t('categories.title'),
      rules: [
        { required: true, message: t('categories.titleRule') },
        () => ({
          validator(rule: Rule, value: string) {
            const currentData = dataSource.find(({ name }) => name === value);
            const isCurrentData = dataSource.find(
              ({ name, _id }) => name !== value && _id === initialValue._id
            );

            if (!isEdit && currentData)
              return Promise.reject(new Error(t('categories.titleCreateExist')));
            if (isEdit && isCurrentData && currentData)
              return Promise.reject(new Error(t('categories.titleEditExist')));
            return Promise.resolve();
          },
        }),
      ],
      component: <Input placeholder={t('categories.title')} />,
    },
    {
      key: 'image',
      label: t('categories.image'),
      rules: [{ required: true, message: t('categories.imageRule') }],
      component: <DropdownImages prefix="categories/images" />,
    },
    {
      key: 'remark',
      label: t('categories.remark'),
      component: <Input placeholder={t('categories.remarkPlaceholder')} />,
    },
  ];

  return (
    <div>
      <Modal
        open={open}
        title={isEdit ? t('categories.formEdit') : t('categories.formCreate')}
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

export default CategoriesFormModal;
