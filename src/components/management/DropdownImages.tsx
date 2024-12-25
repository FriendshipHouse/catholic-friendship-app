import { ReactElement, ReactNode, useState } from 'react';

import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { App, Button, Divider, Popconfirm, Select, Upload, UploadProps } from 'antd';
import axios, { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import useImages from '@/hooks/useImages';

type DropdownImagesProps = {
  onChange?: (value?: string) => void;
  value?: string;
  defaultValue?: string;
  prefix: 'categories/images' | 'activities/images';
};

type DropdownRenderProps = {
  menu: ReactElement;
  props: UploadProps;
};

type OptionRenderProps = {
  label?: ReactNode;
  value?: any;
  onRemoveImage: (url: string) => Promise<void>;
  isLoading: boolean;
};

const getFileNameByPathname = (pathname: string) => {
  const filename = pathname.split('/').pop();
  return filename;
};

const CustomDropdown = ({ menu, props }: DropdownRenderProps) => {
  const t = useTranslations();
  return (
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
  );
};

const dropdownRender = ({ menu, props }: DropdownRenderProps) => (
  <CustomDropdown menu={menu} props={props} />
);

const CustomOption = ({ label, value, onRemoveImage, isLoading }: OptionRenderProps) => {
  const t = useTranslations();

  return (
    <div className="flex w-full items-center justify-between px-3 py-[5px]">
      <div className="flex items-center gap-3">
        <Image
          src={value}
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
          onRemoveImage(value);
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
};

const optionRender = ({ label, value, onRemoveImage, isLoading }: OptionRenderProps) => (
  <CustomOption label={label} value={value} onRemoveImage={onRemoveImage} isLoading={isLoading} />
);

function DropdownImages({
  onChange,
  value,
  defaultValue,
  prefix = 'categories/images',
}: Readonly<DropdownImagesProps>) {
  const t = useTranslations();
  const { message } = App.useApp();

  const [isUploading, setIsUploading] = useState(false);

  const {
    data: categoryImages = [],
    mutate,
    isLoading: isCategoryImagesLoading,
  } = useImages(prefix);

  const isLoading = isUploading || isCategoryImagesLoading;

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
      message.error(t('toast.saveFailed'));
    } finally {
      setIsUploading(false);
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
    } finally {
      setIsUploading(false);
    }
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
    customRequest: ({ file }) => {
      onUpload(file as File)
        .then(() => {
          message.success('Upload successful!');
        })
        .catch((error) => {
          message.error(`Upload failed: ${error.message}`);
        });
    },
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
      dropdownRender={(menu: ReactElement) => dropdownRender({ menu, props })}
      optionRender={({ label, value }) => optionRender({ label, value, onRemoveImage, isLoading })}
      options={options}
    />
  );
}

export default DropdownImages;
