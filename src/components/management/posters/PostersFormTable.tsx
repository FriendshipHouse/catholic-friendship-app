'use client';

import { useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { App, Button, Form, Popconfirm, Space, Table } from 'antd';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import usePosters from '@/hooks/usePosters';

import PostersFormModal from './PostersFormModal';

const INITIAL_VALUE = {
  title: '',
  link: '',
  _id: '',
};

function PostersFormTable() {
  const t = useTranslations();
  const { message } = App.useApp();
  const [form] = Form.useForm<PosterFormValue>();

  const [open, setOpen] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<PosterFormValue>(INITIAL_VALUE);

  const { data: posters = [], isLoading: isPostersLoading, mutate } = usePosters();

  const isLoading = isPostersLoading || isFetchLoading;

  const handleCreate = () => {
    setOpen(true);
    setCurrentFormData(INITIAL_VALUE);
    setIsEdit(false);
  };

  const handleDelete = async ({ _id }: PosterFormValue) => {
    if (!_id) {
      return;
    }
    setIsFetchLoading(true);
    try {
      await axios.delete(`/api/posters/${_id}`);
      await mutate();

      message.success(t('toast.deleteSuccess'));
      setOpen(false);
    } catch (error) {
      message.error(t('toast.deleteFailed'));
    }

    setIsFetchLoading(false);
  };

  const handleEdit = ({ title }: PosterFormValue) => {
    const formData = [...posters].find((item) => title === item.title);
    setCurrentFormData(formData ?? INITIAL_VALUE);
    setOpen(true);
    setIsEdit(true);
  };

  const columns = [
    {
      title: t('posters.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('posters.link'),
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: t('posters.operation'),
      dataIndex: 'operation',
      key: 'operation',
      render: (_: any, formData: PosterFormValue) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(formData)} className="flex gap-2">
            <EditOutlined />
            {t('common.edit')}
          </Button>
          <Popconfirm
            title={t('posters.popConfirmTitle')}
            description={t('posters.popConfirmDescription')}
            onConfirm={() => handleDelete(formData)}
            okText={t('popConfirm.okButton')}
            cancelText={t('popConfirm.cancelButton')}
          >
            <Button type="link" className="flex gap-2">
              <DeleteOutlined />
              {t('common.delete')}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const footer = () => (
    <Button
      type="link"
      className="!p-0 !text-primary-70 hover:!text-primary"
      onClick={handleCreate}
    >
      + {t('posters.formCreate')}
    </Button>
  );

  const onCloseModal = () => {
    setOpen(false);
    setIsEdit(false);
    setCurrentFormData(INITIAL_VALUE);
  };

  const postersTable = posters.map((poster) => ({
    _id: poster._id,
    key: poster._id,
    title: poster.title,
    link: poster.link,
  }));

  return (
    <div>
      <Table dataSource={postersTable} columns={columns} footer={footer} loading={isLoading} />
      <PostersFormModal
        open={open}
        isEdit={isEdit}
        form={form}
        initialValue={currentFormData}
        dataSource={posters}
        setOpen={setOpen}
        onCancel={onCloseModal}
        setIsFetchLoading={setIsFetchLoading}
        handleFinish={() => { }}
      />
    </div>
  );
}

export default PostersFormTable;
