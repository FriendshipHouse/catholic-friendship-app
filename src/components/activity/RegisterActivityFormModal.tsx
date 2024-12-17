'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { App, Checkbox, DatePicker, Form, Input, Modal, Popover, Radio } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { activityModal } from '@/jotai/activityModal';
import {
  INITIAL_REGISTER_ACTIVITY_VALUE,
  registerActivityModal,
} from '@/jotai/registerActivityModal';

import DateFormat from '../DateFormat';

function RegisterActivityFormModal() {
  const t = useTranslations();
  const [form] = Form.useForm<RegisterFormValue>();
  const { data: session } = useSession();
  const { email, image: avatar } = session?.user ?? {};

  const [activityModalState] = useAtom(activityModal);
  const [openModal, setOpenModal] = useAtom(registerActivityModal);

  const [openCancelConfirm, setOpenCancelConfirm] = useState<boolean>(false);
  const [othersClick, setOthersClick] = useState<boolean>(false);
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);

  const { message } = App.useApp();
  const { activityData } = activityModalState ?? {};

  const {
    categoryId,
    eventId,
    _id: activityId,
    name: title = '',
    systemFormInfo = {},
    date = '',
  } = activityData || {};

  const popover = (popoverTitle: string, popoverContent: string) => (
    <Popover content={t(`register.${popoverContent}`)} className="flex items-center gap-2">
      <div>{t(`register.${popoverTitle}`)}</div>
      <div className="text-xs text-gray-50">
        <QuestionCircleOutlined />
      </div>
    </Popover>
  );

  const onFinish = async (formData: RegisterFormValue) => {
    const { id, birthday, knowInfo } = formData;
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

    const registration = { ...formData, email, activityId, categoryId, eventId };

    try {
      await axios.post(`/api/registrations`, [registration]);

      message.success(t('toast.saveSuccess'));
    } catch (error) {
      message.error(t('toast.saveFailed'));
    }

    setIsFetchLoading(false);

    setOpenModal(() => ({
      open: false,
      registerFormValue: INITIAL_REGISTER_ACTIVITY_VALUE,
    }));
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
        disabled: isFetchLoading,
        loading: isFetchLoading,
      }}
      cancelButtonProps={{
        disabled: isFetchLoading,
        loading: isFetchLoading,
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
            registerFormValue: INITIAL_REGISTER_ACTIVITY_VALUE,
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

        <div className="flex flex-col gap-2 text-lg font-bold">
          <DateFormat date={date} isTableList={true} /> {title}
        </div>
        {systemFormInfo?.detail && (
          <div className="flex flex-col gap-2">
            <div className="font-bold">{t(`activities.registerDetail`)}</div>
            <p className="whitespace-pre-wrap leading-6">{systemFormInfo?.detail}</p>
          </div>
        )}
        <div className="border-b border-solid border-gray-30" />

        <Form layout="vertical" form={form} clearOnDestroy onFinish={onFinish}>
          <Form.Item
            name="fullName"
            label={t('register.fullName')}
            rules={[{ required: true, message: t('register.fullNameRule') }]}
            initialValue={INITIAL_REGISTER_ACTIVITY_VALUE?.fullName}
          >
            <Input placeholder={t('register.fullNamePlaceholder')} />
          </Form.Item>

          {systemFormInfo?.extraFields?.includes('birthday') && (
            <Form.Item
              name="birthday"
              label={popover('birthday', 'popoverContent')}
              rules={[{ required: true, message: t('register.birthdayRule') }]}
              initialValue={INITIAL_REGISTER_ACTIVITY_VALUE?.birthday}
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
              initialValue={INITIAL_REGISTER_ACTIVITY_VALUE?.id}
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
            initialValue={INITIAL_REGISTER_ACTIVITY_VALUE?.phone}
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
            initialValue={INITIAL_REGISTER_ACTIVITY_VALUE?.lineId}
          >
            <Input placeholder={t('register.lineIdPlaceholder')} />
          </Form.Item>

          <Form.Item
            name="parish"
            label={t('register.parish')}
            initialValue={INITIAL_REGISTER_ACTIVITY_VALUE?.parish}
          >
            <Input placeholder={t('register.parishPlaceholder')} />
          </Form.Item>

          <Form.Item
            name="sharePicture"
            label={t('register.sharePicture')}
            rules={[{ required: true, message: t('register.sharePictureRule') }]}
            initialValue={INITIAL_REGISTER_ACTIVITY_VALUE?.sharePicture ?? 'yes'}
          >
            <Radio.Group disabled={isFetchLoading}>
              <Radio value="yes">{t('popConfirm.okButton')}</Radio>
              <Radio value="no">{t('popConfirm.cancelButton')}</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="knowInfo"
            label={t('register.knowInfo')}
            rules={[{ required: true, message: t('register.knowInfoRule') }]}
            initialValue={INITIAL_REGISTER_ACTIVITY_VALUE?.knowInfo}
          >
            <Checkbox.Group className="flex flex-col gap-2" disabled={isFetchLoading}>
              <Checkbox value="bulletin">{t('register.bulletin')}</Checkbox>
              <Checkbox value="web">{t('register.web')}</Checkbox>
              <Checkbox value="lineGroup">{t('register.lineGroup')}</Checkbox>
              <Checkbox value="friends">{t('register.friends')}</Checkbox>
              <Checkbox value="apostles">{t('register.apostles')}</Checkbox>
              <Checkbox value="others" onChange={(e) => setOthersClick(e.target.checked)}>
                {t('register.others')}
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>

          {othersClick && (
            <Form.Item name="otherKnowInfo">
              <Input placeholder={t('register.othersPlaceholder')} />
            </Form.Item>
          )}

          <Form.Item
            name="beenHere"
            label={t('register.beenHere')}
            rules={[{ required: true, message: t('register.beenHere') }]}
            initialValue={INITIAL_REGISTER_ACTIVITY_VALUE?.beenHere ?? 'yes'}
          >
            <Radio.Group disabled={isFetchLoading}>
              <Radio value="yes">{t('popConfirm.okButton')}</Radio>
              <Radio value="no">{t('popConfirm.cancelButton')}</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default RegisterActivityFormModal;
