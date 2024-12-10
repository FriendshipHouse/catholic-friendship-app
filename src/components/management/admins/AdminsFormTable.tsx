'use client';

import { useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { App, Button, Form, Popconfirm, Space, Table } from 'antd';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import useAdmins from '@/hooks/useAdmins';

import AdminsFormModal from './AdminsFormModal';

const INITIAL_VALUE = {
  name: '',
  email: '@gmail.com',
  _id: '',
};

function AdminsFormTable() {
  const t = useTranslations();
  const { message } = App.useApp();
  const [form] = Form.useForm<AdminFormValue>();

  const [open, setOpen] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<AdminFormValue>(INITIAL_VALUE);

  const { data: admins = [], isLoading: isAdminsLoading, mutate } = useAdmins();

  const isLoading = isAdminsLoading || isFetchLoading;

  const handleCreate = () => {
    setOpen(true);
    setCurrentFormData(INITIAL_VALUE);
    setIsEdit(false);
  };

  const handleDelete = async ({ _id }: AdminFormValue) => {
    if (!_id) {
      return;
    }
    setIsFetchLoading(true);
    try {
      await axios.delete(`/api/admins/${_id}`);
      await mutate();

      message.success(t('toast.deleteSuccess'));
      setOpen(false);
    } catch (error) {
      message.error(t('toast.deleteFailed'));
    }

    setIsFetchLoading(false);
  };

  const handleEdit = ({ email }: AdminFormValue) => {
    const formData = [...admins].find((item) => email === item.email);
    setCurrentFormData(formData ?? INITIAL_VALUE);
    setOpen(true);
    setIsEdit(true);
  };

  const columns = [
    {
      title: t('admins.title'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('admins.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('admins.operation'),
      dataIndex: 'operation',
      key: 'operation',
      render: (_: any, formData: AdminFormValue) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(formData)} className="flex gap-2">
            <EditOutlined />
            {t('common.edit')}
          </Button>
          <Popconfirm
            title={t('admins.popConfirmTitle')}
            description={t('admins.popConfirmDescription')}
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
      + {t('admins.formCreate')}
    </Button>
  );

  const onCloseModal = () => {
    setOpen(false);
    setIsEdit(false);
    setCurrentFormData(INITIAL_VALUE);
  };

  const adminsTable = admins.map((admin) => ({
    _id: admin._id,
    key: admin._id,
    name: admin.name,
    email: admin.email,
  }));

  return (
    <div>
      <Table dataSource={adminsTable} columns={columns} footer={footer} loading={isLoading} />
      <AdminsFormModal
        open={open}
        isEdit={isEdit}
        form={form}
        initialValue={currentFormData}
        dataSource={admins}
        setOpen={setOpen}
        onCancel={onCloseModal}
        setIsFetchLoading={setIsFetchLoading}
        handleFinish={() => {}}
      />
    </div>
  );
}

export default AdminsFormTable;
