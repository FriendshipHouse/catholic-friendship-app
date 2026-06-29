'use client';

import { useState } from 'react';

import { DownloadOutlined } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import ImageButton from './ImageButton';

type ImageCollectionType = {
  category: string;
  imageItems: {
    id: string;
    label: string;
    onClick: () => void;
  }[];
  selectedImage: { src: string; label: string } | null;
  onModalClose: () => void;
};

const downloadImage = async (src: string, label: string) => {
  const response = await fetch(src);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${label}.png`;
  a.click();

  URL.revokeObjectURL(url);
};

function ImageCollection({
  category,
  imageItems,
  selectedImage,
  onModalClose,
}: Readonly<ImageCollectionType>) {
  const t = useTranslations('prayer');

  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-bold">{t(`${category}.title`)}</div>
      <div className="flex justify-center sm:justify-start flex-wrap gap-4">
        {imageItems.map(({ id, label, onClick }) => (
          <ImageButton
            key={id}
            onClick={onClick}
            imageSrc={`/prayer/${category}/thumbnail/img_${id}.webp`}
            label={label}
          />
        ))}
      </div>

      <Modal open={!!selectedImage} onCancel={onModalClose} footer={null} centered>
        {selectedImage && (
          <div className="w-fit flex flex-col items-center justify-center gap-10 m-6">
            <div className="text-xs text-center">- {selectedImage?.label} -</div>
            <div className="flex flex-col gap-2 justify-center">
              <Spin spinning={isImageLoading}>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.label}
                  width={900}
                  height={600}
                  loading="eager"
                  onLoad={() => setIsImageLoading(false)}
                  className="w-full h-auto rounded-md"
                />
              </Spin>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => {
                  if (selectedImage) {
                    downloadImage(selectedImage.src, selectedImage.label);
                  }
                }}
                className="!text-xs"
              >
                {t('download')}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ImageCollection;
