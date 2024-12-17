'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from 'react';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { App, Checkbox, DatePicker, Form, Input, Modal, Popover, Radio, Select } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import useActivities from '@/hooks/useActivities';
import useEvents from '@/hooks/useEvents';
import useMyRegistrations from '@/hooks/useMyRegistrations';
import { INITIAL_REGISTER_EVENT_VALUE, registerEventModal } from '@/jotai/registerEventModal';

function RegisterEventFormModal() {
  const t = useTranslations();
  const params = useParams();
  const { eventId } = params;

  const [form] = Form.useForm<RegisterFormValue<string[]>>();
  const { data: session } = useSession();
  const { email, image: avatar } = session?.user ?? {};

  const [openModal, setOpenModal] = useAtom(registerEventModal);

  const [openCancelConfirm, setOpenCancelConfirm] = useState<boolean>(false);
  const [isKnowInfoOthers, setIsKnowInfoOthers] = useState<boolean>(false);
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
  const [dateSelect, setDateSelect] = useState<string>();

  const { message } = App.useApp();

  const { data: events = [] } = useEvents();

  const { categoryId, name: eventName } = events.find((event) => event._id === eventId) ?? {};

  const { data: activities = [], isLoading: isActivitiesLoading } = useActivities(
    categoryId,
    eventId as string
  );

  const { data: myRegistrations } = useMyRegistrations();

  const isLoading = isActivitiesLoading || isFetchLoading;

  const title = eventName ?? '';
  const systemFormInfo = activities?.[0]?.systemFormInfo || {};

  const popover = (popoverTitle: string, popoverContent: string) => (
    <Popover content={t(`register.${popoverContent}`)} className="flex items-center gap-2">
      <div>{t(`register.${popoverTitle}`)}</div>
      <div className="text-xs text-gray-50">
        <QuestionCircleOutlined />
      </div>
    </Popover>
  );

  const dateOptions = activities
    .filter((item) => {
      if (item.eventId !== eventId && item.googleFormLink) return false;

      if (typeof item.date === 'string') {
        const dueDateAbbr = item.systemFormInfo?.dueDate;

        const dueDateReference = {
          day: dayjs(item.date),
          week: dayjs(item.date).subtract(1, 'week'),
          month: dayjs(item.date).subtract(1, 'month'),
        };

        if (dueDateAbbr === 'day' || dueDateAbbr === 'week' || dueDateAbbr === 'month') {
          return dueDateAbbr && dayjs().isBefore(dueDateReference[dueDateAbbr], 'day');
        }
      }
      return false;
    })
    .map((item) => ({ label: `${item.name}: ${item.date}`, value: item._id, date: item.date }));

  const isRegistered = useMemo(
    () =>
      dateOptions
        .map((option) => {
          const registeredId = myRegistrations?.some(
            (data) => data.activityId === option.value && data.date === option.date
          );
          return registeredId ? option.value : null;
        })
        .filter((id) => id !== null),
    [dateOptions, myRegistrations]
  );

  const onFinish = async (formData: RegisterFormValue<string[]>) => {
    const isActivityRegistered =
      Array.isArray(dateSelect) && dateSelect?.some((date: string) => isRegistered?.includes(date));

    if (isActivityRegistered) return message.error(t('toast.dataDuplicated'));

    const { id, knowInfo, birthday, activityId } = formData;
    setIsFetchLoading(true);

    if (id) {
      formData.id = id.toUpperCase();
    }

    if (birthday) {
      formData.birthday = dayjs(birthday).startOf('day').format('YYYY-MM-DD');
    }

    if (!knowInfo?.includes('others')) {
      formData.otherKnowInfo = undefined;
    }

    const registrations = activityId.map((id) => {
      const activity = activities.find((item) => item._id === id);

      return {
        ...formData,
        email,
        categoryId: activity?.categoryId ?? '',
        eventId: activity?.eventId ?? '',
        activityId: activity?._id ?? '',
      };
    });

    try {
      await axios.post(`/api/registrations`, registrations);

      message.success(t('toast.saveSuccess'));
    } catch (error) {
      message.error(t('toast.saveFailed'));
    }

    setIsFetchLoading(false);

    setOpenModal({ open: false, registerFormValue: INITIAL_REGISTER_EVENT_VALUE });
  };

  return (
    <Modal
      open={openModal.open}
      okText={t('common.confirm')}
      cancelText={t('common.cancel')}
      maskClosable={false}
      width={700}
      destroyOnClose
      onCancel={() => {
        setOpenCancelConfirm(true);
      }}
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
      onOk={() => {
        form.submit();
      }}
    >
      <Modal
        open={openCancelConfirm}
        title={t('register.cancelConfirmTitle')}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
        onOk={() => {
          setOpenCancelConfirm(false);
          setOpenModal({
            open: false,
            registerFormValue: INITIAL_REGISTER_EVENT_VALUE,
          });
        }}
        onCancel={() => {
          setOpenCancelConfirm(false);
        }}
        destroyOnClose
      >
        <div>{t('register.cancelConfirmContent')}</div>
      </Modal>
      <div className="flex flex-col gap-5 p-5">
        <div className="text-lg font-bold">{t('register.title')}</div>

        <div className="flex gap-2">
          {avatar && (
            <img
              src={avatar}
              alt="avatar"
              className="h-4 w-4 overflow-hidden rounded-full lg:h-[20px] lg:w-[20px]"
            />
          )}
          <div>{email}</div>
        </div>
        <div className="border-b border-solid border-gray-30" />
        <div className="text-lg font-bold">{title ?? ''}</div>

        <Form layout="vertical" form={form} clearOnDestroy onFinish={onFinish}>
          <Form.Item
            name="activityId"
            label={t('register.date')}
            rules={[{ required: true, message: t('register.dateRule') }]}
          >
            <Select
              mode="multiple"
              placeholder={t('register.dateRule')}
              options={dateOptions}
              loading={isActivitiesLoading}
              onChange={(value) => setDateSelect(value)}
            />
          </Form.Item>

          <Form.Item
            name="fullName"
            label={t('register.fullName')}
            rules={[{ required: true, message: t('register.fullNameRule') }]}
            initialValue={INITIAL_REGISTER_EVENT_VALUE?.fullName}
          >
            <Input placeholder={t('register.fullNamePlaceholder')} />
          </Form.Item>

          {systemFormInfo?.extraFields?.includes('birthday') && (
            <Form.Item
              name="birthday"
              label={popover('birthday', 'popoverContent')}
              rules={[{ required: true, message: t('register.birthdayRule') }]}
              initialValue={INITIAL_REGISTER_EVENT_VALUE?.birthday}
            >
              <DatePicker
                className="w-full"
                placeholder={t('register.birthday')}
                format={{
                  format: 'YYYY-MM-DD',
                  type: 'mask',
                }}
              />
            </Form.Item>
          )}

          {systemFormInfo?.extraFields?.includes('id') && (
            <Form.Item
              name="id"
              label={popover('id', 'popoverContent')}
              initialValue={INITIAL_REGISTER_EVENT_VALUE?.id}
              rules={[
                { required: true, message: t('register.idRule') },
                () => ({
                  validator(rule, value) {
                    const isLengthCorrect = value.length === 10;
                    const regex = /^[A-Za-z]\d{9}$/;

                    if (!regex.test(value) || !isLengthCorrect)
                      return Promise.reject(new Error(t('register.idError')));
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input placeholder={t('register.idPlaceholder')} />
            </Form.Item>
          )}

          <Form.Item
            name="phone"
            label={t('register.phone')}
            initialValue={INITIAL_REGISTER_EVENT_VALUE?.phone}
            rules={[
              { required: true, message: t('register.phoneRule') },
              () => ({
                validator(rule, value) {
                  const isLengthCorrect = value.length === 10;
                  const regex = /^09\d{8}$/;

                  if (!regex.test(value) || !isLengthCorrect)
                    return Promise.reject(new Error(t('register.phoneError')));
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder={t('register.phonePlaceholder')} />
          </Form.Item>

          <Form.Item
            name="lineId"
            label={t('register.lineId')}
            rules={[{ required: true, message: t('register.lineIdRule') }]}
            initialValue={INITIAL_REGISTER_EVENT_VALUE?.lineId}
          >
            <Input placeholder={t('register.lineIdPlaceholder')} />
          </Form.Item>

          <Form.Item
            name="parish"
            label={t('register.parish')}
            initialValue={INITIAL_REGISTER_EVENT_VALUE?.parish}
          >
            <Input placeholder={t('register.parishPlaceholder')} />
          </Form.Item>

          <Form.Item
            name="sharePicture"
            label={t('register.sharePicture')}
            rules={[{ required: true, message: t('register.sharePictureRule') }]}
            initialValue={INITIAL_REGISTER_EVENT_VALUE?.sharePicture ?? 'yes'}
          >
            <Radio.Group disabled={isLoading}>
              <Radio value="yes">{t('popConfirm.okButton')}</Radio>
              <Radio value="no">{t('popConfirm.cancelButton')}</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="knowInfo"
            label={t('register.knowInfo')}
            rules={[{ required: true, message: t('register.knowInfoRule') }]}
            initialValue={INITIAL_REGISTER_EVENT_VALUE?.knowInfo}
          >
            <Checkbox.Group className="flex flex-col gap-2" disabled={isLoading}>
              <Checkbox value="bulletin">{t('register.bulletin')}</Checkbox>
              <Checkbox value="web">{t('register.web')}</Checkbox>
              <Checkbox value="lineGroup">{t('register.lineGroup')}</Checkbox>
              <Checkbox value="friends">{t('register.friends')}</Checkbox>
              <Checkbox value="apostles">{t('register.apostles')}</Checkbox>
              <Checkbox value="others" onChange={(e) => setIsKnowInfoOthers(e.target.checked)}>
                {t('register.others')}
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>

          {isKnowInfoOthers && (
            <Form.Item name="otherKnowInfo">
              <Input placeholder={t('register.othersPlaceholder')} />
            </Form.Item>
          )}

          <Form.Item
            name="beenHere"
            label={t('register.beenHere')}
            rules={[{ required: true, message: t('register.beenHere') }]}
            initialValue={INITIAL_REGISTER_EVENT_VALUE?.beenHere ?? 'yes'}
          >
            <Radio.Group disabled={isLoading}>
              <Radio value="yes">{t('popConfirm.okButton')}</Radio>
              <Radio value="no">{t('popConfirm.cancelButton')}</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default RegisterEventFormModal;
