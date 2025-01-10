'use client';

import { Dispatch, SetStateAction } from 'react';

import { App, Form, FormInstance, Input, Modal } from 'antd';
import { Rule } from 'antd/es/form';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import usePosters from '@/hooks/usePosters';

type PostersFormModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onCancel: () => void;
  isEdit: boolean;
  form: FormInstance<PosterFormValue>;
  handleFinish: () => void;
  initialValue: PosterFormValue;
  dataSource: PosterFormValue[];
  setIsFetchLoading: Dispatch<SetStateAction<boolean>>;
};

function PostersFormModal({
  open,
  isEdit,
  form,
  initialValue,
  dataSource,
  setOpen,
  onCancel,
  handleFinish,
  setIsFetchLoading,
}: Readonly<PostersFormModalProps>) {
  const t = useTranslations();
  const { message } = App.useApp();
  const { mutate } = usePosters();

  const onCreate = async (formData: PosterFormValue) => {
    setIsFetchLoading(true);
    try {
      await axios.post('/api/posters', formData);
      await mutate();

      message.success(t('toast.saveSuccess'));
      setOpen(false);
    } catch (error) {
      message.error(t('toast.saveFailed'));
    }
    setIsFetchLoading(false);
  };

  const onEditSave = async (formData: PosterFormValue) => {
    if (!initialValue._id) {
      return;
    }
    setIsFetchLoading(true);
    try {
      await axios.patch(`/api/posters/${initialValue._id}`, formData);
      await mutate();

      message.success(t('toast.saveSuccess'));
      setOpen(false);
    } catch (error) {
      message.error(t('toast.saveFailed'));
    }
    setIsFetchLoading(false);
  };

  const onFinish = async (formData: PosterFormValue) => {
    if (isEdit) {
      await onEditSave(formData);
    } else {
      await onCreate(formData);
    }
    handleFinish();
  };

  const formItems = [
    {
      key: 'title',
      label: t('posters.title'),
      rules: [{ required: true, message: t('posters.titleRule') }],
      component: <Input placeholder={t('posters.title')} />,
    },
    {
      key: 'link',
      label: t('posters.link'),
      rules: [
        { required: true, message: t('posters.linkRule'), type: 'link' },
        () => ({
          validator(rule: Rule, value: string) {
            const currentData = dataSource.find(({ link }) => link === value);
            const isCurrentData = dataSource.find(
              ({ link, _id }) => link !== value && _id === initialValue._id
            );

            if (!isEdit && currentData)
              return Promise.reject(new Error(t('posters.linkCreateExist')));
            if (isEdit && isCurrentData && currentData)
              return Promise.reject(new Error(t('posters.linkEditExist')));
            return Promise.resolve();
          },
        }),
      ],
      component: <Input type="textarea" placeholder={t('posters.linkPlaceHolder')} />,
    },
  ];

  return (
    <div>
      <Modal
        open={open}
        title={isEdit ? t('posters.formEdit') : t('posters.formCreate')}
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
export default PostersFormModal;
