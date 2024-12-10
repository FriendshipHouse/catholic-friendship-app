import { ReactNode, useState } from 'react';

import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { App, Button, Divider, Popconfirm, Select, Upload, UploadProps } from 'antd';
import axios, { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import useImages from '@/hooks/useImages';

type DropdownImagesProps = {
  onChange?: (value?: ReactNode) => void;
  value?: string;
  defaultValue?: string;
  prefix: 'categories/images' | 'activities/images';
};

const getFileNameByPathname = (pathname: string) => {
  const filename = pathname.split('/').pop();
  return filename;
};

function DropdownImages({
  onChange,
  value,
  defaultValue,
  prefix = 'categories/images',
}: DropdownImagesProps) {
  const t = useTranslations();
  const { message } = App.useApp();

  const [isUploading, setIsUploading] = useState(false);

  const {
    data: categoryImages = [],
    mutate,
    isLoading: isCategoriesImagesLoading,
  } = useImages(prefix);

  const isLoading = isUploading || isCategoriesImagesLoading;

  const options = categoryImages.map(({ url, pathname }) => {
    const filename = getFileNameByPathname(pathname);
    return { value: url, label: filename };
  });

  const onUpload = async (file: File) => {
    if (!file?.name) return;

    setIsUploading(true);

    try {
      await axios.post(`/api/images?filename=${file.name}&prefix=${prefix}`, file);
      await mutate();

      message.success(t('toast.saveSuccess'));
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(error?.message);
        return;
      }
      message.success(t('toast.saveFailed'));
    }
  };

  const onRemoveImage = async (url: string) => {
    setIsUploading(true);

    try {
      await axios.delete(`/api/images?url=${url}`);
      await mutate();
      if (onChange) onChange();

      message.success(t('toast.saveSuccess'));
    } catch (error) {
      if (error instanceof AxiosError) {
        message.error(error?.message);
        return;
      }
      message.error(t('toast.saveFailed'));
    }
    setIsUploading(false);
  };

  const props: UploadProps = {
    accept: 'image/png, image/jpeg',
    className: '[&_.ant-upload]:w-full',
    fileList: [],
    beforeUpload: (file) => {
      const isImage = file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isImage) {
        message.error(`${file.name} is not a png file`);
      }

      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        message.error('Image must smaller than 1MB!');
      }

      const isMultiple = categoryImages.some(({ pathname }) => {
        const filename = getFileNameByPathname(pathname);
        return filename === file.name;
      });

      if (isMultiple) {
        message.error('Multiple file name');
      }

      return isImage && isLt2M && !isMultiple;
    },
    customRequest: ({ file }) => onUpload(file as File),
  };

  return (
    <Select
      popupClassName="[&_.ant-select-item]:!p-0"
      className="w-full"
      loading={isLoading}
      disabled={isLoading}
      placeholder={t('uploadImages.placeholder')}
      defaultValue={defaultValue}
      value={value}
      onSelect={(value, { label }) => {
        if (onChange) onChange(label);
      }}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <div className="w-full justify-end">
            <Upload {...props}>
              <Button type="text" block icon={<UploadOutlined />}>
                {t('uploadImages.upload')}
              </Button>
            </Upload>
          </div>
        </>
      )}
      optionRender={(option) => {
        const { label, value } = option;
        return (
          <div className="flex w-full items-center justify-between px-3 py-[5px]">
            <div className="flex items-center gap-3">
              <Image
                src={value as string}
                alt="Image"
                width={300}
                height="0"
                className="h-auto w-full max-w-[48px]"
              />
              <div>{label}</div>
            </div>
            <Popconfirm
              title={t('uploadImages.noticeTitle')}
              description={t('uploadImages.noticeContent')}
              okText={t('common.confirm')}
              cancelText={t('common.cancel')}
              onConfirm={(e) => {
                if (e) e.stopPropagation();
                onRemoveImage(value as string);
              }}
              onCancel={(e) => {
                if (e) e.stopPropagation();
              }}
              cancelButtonProps={{ disabled: isLoading }}
            >
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </Popconfirm>
          </div>
        );
      }}
      options={options}
    />
  );
}

export default DropdownImages;
