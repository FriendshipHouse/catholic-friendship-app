'use client';

import { useState } from 'react';

import { Spin } from 'antd';
import Image from 'next/image';

type ImageButtonTypes = {
  onClick: () => void;
  imageSrc: string;
  label: string;
};

function ImageButton({ onClick, imageSrc, label }: Readonly<ImageButtonTypes>) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden w-full sm:max-w-[300px] h-auto rounded-md transition-transform duration-300 active:scale-100"
    >
      <Spin spinning={isLoading}>
        <Image
          src={imageSrc}
          alt={label}
          width={300}
          height={300}
          loading="eager"
          onLoad={() => setIsLoading(false)}
          className="h-auto w-full object-cover transition-all duration-500 scale-95 sm:opacity-50 sm:grayscale rounded-md group-hover:scale-100 group-hover:grayscale-0 group-hover:opacity-100"
        />
      </Spin>
      <div className="absolute inset-0 z-10 bg-gray-30/10 transition-opacity duration-300 group-hover:opacity-0" />
    </button>
  );
}

export default ImageButton;
