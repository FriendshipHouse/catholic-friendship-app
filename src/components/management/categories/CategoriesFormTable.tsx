'use client';

import React, { useContext, useMemo, useState } from 'react';

import { DeleteOutlined, EditOutlined, HolderOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { App, Button, Empty, Form, Popconfirm, Space, Table, TableColumnsType } from 'antd';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import useCategories from '@/hooks/useCategories';
import useImages from '@/hooks/useImages';

import CategoriesFormModal from './CategoriesFormModal';

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const INITIAL_VALUE = {
  name: '',
  image: '',
  _id: '',
  order: 0,
};

function CategoriesFormTable() {
  const t = useTranslations();
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<CategoriesFormValue>(INITIAL_VALUE);

  const {
    data: categories = [],
    mutate: updateCategories,
    isLoading: isCategoriesLoading,
  } = useCategories();

  const { data: categoryImages = [], isLoading: isCategoryImagesLoading } =
    useImages('categories/images');

  const isLoading = isCategoriesLoading || isCategoryImagesLoading || isFetchLoading;

  const handleCreate = () => {
    setOpen(true);
    setCurrentFormData(INITIAL_VALUE);
    setIsEdit(false);
  };

  const handleDelete = async ({ _id }: CategoriesFormValue) => {
    if (!_id) {
      return;
    }
    setIsFetchLoading(true);
    try {
      await axios.delete(`/api/categories/${_id}`);
      await updateCategories();

      setOpen(false);
      message.success(t('toast.deleteSuccess'));
    } catch (error) {
      message.error(t('toast.deleteFailed'));
    }
    setIsFetchLoading(false);
  };

  const handleEdit = ({ name }: CategoriesFormValue) => {
    const formData = [...categories].find((item) => name === item.name);
    setCurrentFormData(formData ?? INITIAL_VALUE);
    setOpen(true);
    setIsEdit(true);
  };

  const footer = () => (
    <Button
      type="link"
      className="!p-0 !text-primary-70 hover:!text-primary"
      onClick={handleCreate}
    >
      + {t('categories.formCreate')}
    </Button>
  );

  const RowContext = React.createContext<RowContextProps>({});

  const DragHandle = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);
    return (
      <Button
        type="text"
        size="small"
        icon={<HolderOutlined />}
        style={{ cursor: 'move' }}
        ref={setActivatorNodeRef}
        {...listeners}
      />
    );
  };

  const columns: TableColumnsType<CategoriesFormValue> = [
    {
      key: 'sort',
      align: 'center',
      width: 80,
      render: () => <DragHandle />,
    },
    {
      title: t('categories.title'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('categories.image'),
      dataIndex: 'image',
      key: 'image',
      render: (_: any, { image }: CategoriesFormValue) => {
        const { url = '' } =
          categoryImages.find((imageInfo) => {
            const filename = (imageInfo?.pathname ?? '').split('/').pop();
            return filename === image;
          }) ?? {};

        return (
          <div className="flex items-center gap-4">
            {url ? (
              <Image
                priority
                src={url}
                alt="Image"
                width={300}
                height="0"
                className="h-auto w-full max-w-[44px]"
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
            <div>{image}</div>
          </div>
        );
      },
    },
    {
      title: t('categories.remark'),
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: t('categories.operation'),
      dataIndex: 'operation',
      key: 'operation',
      render: (_: any, formData: CategoriesFormValue) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(formData)} className="flex gap-2">
            <EditOutlined />
            {t('common.edit')}
          </Button>
          <Popconfirm
            title={t('categories.popConfirmTitle')}
            description={t('categories.popConfirmDescription')}
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

  const Row: React.FC<RowProps> = (props) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: props['data-row-key'] });

    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Translate.toString(transform),
      transition,
      ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    const contextValue = useMemo<RowContextProps>(
      () => ({ setActivatorNodeRef, listeners }),
      [setActivatorNodeRef, listeners]
    );

    return (
      <RowContext.Provider value={contextValue}>
        <tr {...props} ref={setNodeRef} style={style} {...attributes} />
      </RowContext.Provider>
    );
  };

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id) return;

    setIsFetchLoading(true);

    const activeIndex = categories.findIndex((formData) => formData._id === active.id);
    const overIndex = categories.findIndex((formData) => formData._id === over?.id);
    const newCategories = arrayMove(categories, activeIndex, overIndex);

    try {
      await axios.put('/api/categories', newCategories);
      await updateCategories();

      message.success(t('toast.saveSuccess'));
    } catch (error) {
      message.error(t('toast.dragFailed'));
    }

    setIsFetchLoading(false);
  };

  const onCloseModal = () => {
    setOpen(false);
    setCurrentFormData(INITIAL_VALUE);
    setIsEdit(false);
  };

  const categoriesTable = categories.map((category) => ({
    ...category,
    key: category._id,
  }));

  const emptyText = () => {
    const text = t('emptyText.category');
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={text} />;
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={categories.map((i) => i._id)} strategy={verticalListSortingStrategy}>
        <div>
          <Table<CategoriesFormValue>
            rowKey="key"
            components={{ body: { row: Row } }}
            columns={columns}
            dataSource={categoriesTable}
            footer={footer}
            loading={isLoading}
            locale={{ emptyText }}
          />
          <CategoriesFormModal
            open={open}
            isEdit={isEdit}
            form={form}
            initialValue={currentFormData}
            dataSource={categories}
            onCancel={onCloseModal}
            setIsFetchLoading={setIsFetchLoading}
          />
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default CategoriesFormTable;
