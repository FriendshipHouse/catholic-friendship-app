'use client';

import React, { useContext, useMemo, useState } from 'react';

import { DeleteOutlined, EditOutlined, HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
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
import { useSearchParams } from 'next/navigation';

import useCategories from '@/hooks/useCategories';
import useEventsByCategoryId from '@/hooks/useEventsByCategoryId';

import EventsFormModal from './EventsFormModal';

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const INITIAL_VALUE = {
  name: '',
  description: '',
  categoryId: '',
  order: 0,
  _id: '',
};

function EventsFormTable() {
  const t = useTranslations();
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const { data: categories } = useCategories();

  const [open, setOpen] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<EventsFormValue>(INITIAL_VALUE);

  const {
    data: events = [],
    mutate: updateEvents,
    isLoading: isEventsLoading,
  } = useEventsByCategoryId(categories && (categoryId ?? categories?.[0]?._id));

  const isLoading = isEventsLoading || isFetchLoading;

  const handleCreate = () => {
    setOpen(true);
    setCurrentFormData(INITIAL_VALUE);
    setIsEdit(false);
  };

  const handleDelete = async ({ _id }: EventsFormValue) => {
    if (!_id) {
      return;
    }
    setIsFetchLoading(true);
    try {
      await axios.delete(`/api/events/${_id}`);
      await updateEvents();

      setOpen(false);
      message.success(t('toast.deleteSuccess'));
    } catch (error) {
      message.error(t('toast.deleteFailed'));
    }
    setIsFetchLoading(false);
  };

  const handleEdit = ({ name }: EventsFormValue) => {
    const formData = [...events].find((item) => name === item.name);
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
      + {t('eventsManage.formCreate')}
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

  const columns: TableColumnsType<EventsFormValue> = [
    {
      key: 'sort',
      align: 'center',
      width: 80,
      render: () => <DragHandle />,
    },
    {
      title: t('eventsManage.title'),
      dataIndex: 'name',
      key: 'name',
      className: 'min-w-[140px]',
    },
    {
      title: t('eventsManage.description'),
      dataIndex: 'description',
      key: 'description',
      className: 'min-w-[200px]',
    },
    {
      title: t('eventsManage.operation'),
      dataIndex: 'operation',
      key: 'operation',
      className: 'text-wrap',
      render: (_: any, formData: EventsFormValue) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(formData)} className="flex gap-2">
            <EditOutlined />
            {t('common.edit')}
          </Button>
          <Popconfirm
            title={t('eventsManage.popConfirmTitle')}
            description={t('eventsManage.popConfirmDescription')}
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

    const activeIndex = events.findIndex((formData) => formData._id === active.id);
    const overIndex = events.findIndex((formData) => formData._id === over?.id);
    const newEvents = arrayMove(events, activeIndex, overIndex);

    try {
      await axios.put(`/api/events?categoryId=${categoryId}`, newEvents);
      await updateEvents();

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

  const eventsTable = events.map((events) => ({
    ...events,
    key: events._id,
  }));

  const emptyText = () => {
    const text = t('emptyText.event');
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={text} />;
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={events.map((i) => i._id)} strategy={verticalListSortingStrategy}>
        <Table<EventsFormValue>
          rowKey="key"
          components={{ body: { row: Row } }}
          columns={columns}
          dataSource={eventsTable}
          footer={footer}
          loading={isLoading}
          locale={{ emptyText }}
          scroll={{ x: 1024 }}
        ></Table>
        <EventsFormModal
          open={open}
          isEdit={isEdit}
          form={form}
          initialValue={currentFormData}
          dataSource={events}
          onCancel={onCloseModal}
          setIsFetchLoading={setIsFetchLoading}
        />
      </SortableContext>
    </DndContext>
  );
}

export default EventsFormTable;
