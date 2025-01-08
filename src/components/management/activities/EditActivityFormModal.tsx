'use client';

import { Dispatch, SetStateAction } from 'react';

import {
  App,
  Checkbox,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
  Radio,
  TimePicker,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import axios from 'axios';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import useActivities from '@/hooks/useActivities';

import DropdownImages from '../DropdownImages';

type ActivitiesFormModalProps = {
  open: boolean;
  isLoading: boolean;
  form: FormInstance<ActivitiesFormValue>;
  initialValue: ActivitiesFormValue;
  onCancel: () => void;
  setIsFetchLoading: Dispatch<SetStateAction<boolean>>;
};

function ActivitiesFormModal({
  open,
  form,
  initialValue,
  onCancel,
  isLoading,
  setIsFetchLoading,
}: Readonly<ActivitiesFormModalProps>) {
  const t = useTranslations();
  const { message } = App.useApp();

  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const eventId = searchParams.get('eventId');

  const { data: activities, mutate } = useActivities(categoryId, eventId);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const existedDates = activities?.map(({ date }) => dayjs(`${date}`)) || [];
    return existedDates.some((date) => date.isSame(current, 'day'));
  };

  const onEditSave = async (formData: ActivitiesFormValue) => {
    if (!initialValue?._id) {
      return;
    }

    setIsFetchLoading(true);
    try {
      await axios.patch(`/api/activities/${initialValue._id}`, formData);
      await mutate();

      message.success(t('toast.saveSuccess'));
      onCancel();
    } catch (error) {
      message.error(t('toast.saveFailed'));
    }
    setIsFetchLoading(false);
  };

  const onFinish = async (formData: ActivitiesFormValue) => {
    if (formData.registerType === 'system') {
      delete formData.googleFormLink;
    }

    const { date, time } = formData;

    const activityTime = (time ?? []).map((dateTime) => dayjs(dateTime).format('HH:mm'));

    const activityData = {
      ...formData,
      time: activityTime,
      date: dayjs(date as string).format('YYYY-MM-DD'),
    };

    onEditSave(activityData);
  };

  const registerType = Form.useWatch('registerType', form) ?? initialValue?.registerType;

  const defaultDate = initialValue?.date as string;
  const defaultTime = initialValue?.time?.map((time) => {
    const value = dayjs(time, 'HH:mm');
    return value.isValid() ? value : null;
  }) ?? [null, null];

  return (
    <div>
      <Modal
        open={open}
        loading={isLoading}
        title={t('activities.formEdit')}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
        okButtonProps={{
          autoFocus: true,
          htmlType: 'submit',
          disabled: isLoading,
          loading: isLoading,
        }}
        cancelButtonProps={{
          disabled: isLoading,
          loading: isLoading,
        }}
        onCancel={onCancel}
        onOk={() => form.submit()}
        destroyOnClose
        width={1000}
      >
        <Form layout="vertical" form={form} name="form_in_modal" clearOnDestroy onFinish={onFinish}>
          <Form.Item
            name="name"
            label={t('activities.title')}
            rules={[{ required: true, message: t('activities.titleRule') }]}
            initialValue={initialValue?.name}
          >
            <Input placeholder={t('activities.title')} disabled={isLoading} maxLength={20} showCount />
          </Form.Item>

          <Form.Item required label={t('activities.date')} className="!mb-0">
            <div className="flex flex-col">
              <Radio.Group defaultValue="dateBySingle" disabled={isLoading}>
                <Radio value="dateBySingle">{t('activities.dateBySingle')}</Radio>
                <Radio value="dateByBatch" disabled>
                  {t('activities.dateByBatch')}
                </Radio>
              </Radio.Group>
            </div>
          </Form.Item>

          <Form.Item
            name="date"
            rules={[{ required: true, message: t('activities.dateRule') }]}
            initialValue={dayjs(defaultDate).isValid() ? dayjs(defaultDate) : null}
          >
            <DatePicker
              className="w-full"
              disabled={isLoading}
              maxTagCount="responsive"
              format="YYYY-MM-DD"
              disabledDate={disabledDate}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="time"
              label={t('activities.time')}
              rules={[{ required: true, message: t('activities.timeRule') }]}
              initialValue={defaultTime}
            >
              <TimePicker.RangePicker
                disabled={isLoading}
                minuteStep={15}
                format="HH:mm"
                needConfirm={false}
              />
            </Form.Item>

            <Form.Item
              name="location"
              label={t('activities.location')}
              rules={[{ required: true, message: t('activities.locationRule') }]}
              initialValue={initialValue?.location}
            >
              <Input placeholder={t('activities.locationPlaceholder')} disabled={isLoading} maxLength={20} showCount />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label={t('activities.description')}
            rules={[{ required: true, message: t('activities.descriptionRule') }]}
            initialValue={initialValue?.description}
          >
            <Input.TextArea
              showCount
              maxLength={500}
              disabled={isLoading}
              placeholder={t('activities.descriptionRule')}
              autoSize={{ minRows: 3, maxRows: 15 }}
            />
          </Form.Item>

          <Form.Item
            name="image"
            label={t('activities.image')}
            rules={[{ required: true, message: t('activities.imageRule') }]}
            initialValue={initialValue?.image}
          >
            <DropdownImages prefix="activities/images" />
          </Form.Item>

          <Form.Item
            name="registerType"
            label={t('activities.registerType')}
            rules={[{ required: true, message: t('activities.googleFormLinkRule') }]}
            initialValue={initialValue?.registerType ?? 'google'}
          >
            <Radio.Group disabled={isLoading}>
              <Radio value="google">{t('activities.googleFormLink')}</Radio>
              <Radio value="system">{t('activities.systemForm')}</Radio>
            </Radio.Group>
          </Form.Item>

          {registerType === 'google' && (
            <Form.Item
              name="googleFormLink"
              rules={[{ required: true, message: t('activities.googleFormLinkRule') }]}
              initialValue={initialValue?.googleFormLink}
            >
              <Input placeholder={t('activities.googleFormLinkRule')} disabled={isLoading} />
            </Form.Item>
          )}

          {registerType === 'system' && (
            <div className="flex flex-col rounded-md border border-solid border-gray-40 p-4">
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name={['systemFormInfo', 'dueDate']}
                  label={t('activities.dueDate')}
                  rules={[{ required: true, message: t('activities.dueDateRule') }]}
                  initialValue={initialValue?.systemFormInfo?.dueDate}
                >
                  <Radio.Group className="flex flex-col" disabled={isLoading}>
                    <Radio value="day">{t('activities.day')}</Radio>
                    <Radio value="week">{t('activities.week')}</Radio>
                    <Radio value="month">{t('activities.month')}</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name={['systemFormInfo', 'extraFields']}
                  label={t('activities.extraFields')}
                  className="flex flex-col"
                  initialValue={initialValue?.systemFormInfo?.extraFields}
                >
                  <Checkbox.Group className="flex flex-col" disabled={isLoading}>
                    <Checkbox value="birthday">{t('activities.birthday')}</Checkbox>
                    <Checkbox value="id">{t('activities.id')}</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </div>

              <Form.Item
                name={['systemFormInfo', 'detail']}
                label={t('activities.registerDetail')}
                initialValue={initialValue?.systemFormInfo?.detail}
              >
                <Input.TextArea
                  placeholder={t('activities.registerDetailPlaceholder')}
                  disabled={isLoading}
                  showCount
                  maxLength={500}
                  autoSize={{ minRows: 3, maxRows: 15 }}
                />
              </Form.Item>

              <Form.Item
                name={['systemFormInfo', 'notice']}
                label={t('activities.registerNotice')}
                initialValue={initialValue?.systemFormInfo?.notice}
              >
                <Input.TextArea
                  placeholder={t('activities.registerNoticePlaceholder')}
                  disabled={isLoading}
                  showCount
                  maxLength={500}
                  autoSize={{ minRows: 3, maxRows: 15 }}
                />
              </Form.Item>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
}
export default ActivitiesFormModal;
