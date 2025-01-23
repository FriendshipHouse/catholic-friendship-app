'use client';

import { Button } from 'antd';
import { ArrowRightShort } from 'react-bootstrap-icons';

import { useRouter } from '@/i18n/routing';

type ButtonProps = {
  children: string | React.ReactNode;
  pathname: string;
};

function IndexButton({ children, pathname }: Readonly<ButtonProps>) {
  const router = useRouter();
  const onClick = () => {
    router.push({ pathname });
  };
  return (
    <Button
      type="default"
      className="!group !w-full !bg-gray-20/60 !py-5 !text-gray-80 !shadow-4xl !backdrop-blur !duration-150 hover:!bg-gray-10 sm:!max-w-44 md:!max-w-52"
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-4 text-[16px] font-semibold md:text-lg text-wrap leading-tight">
        {children}
        <ArrowRightShort className="text-2xl hover:text-primary" />
      </div>
    </Button>
  );
}

export default IndexButton;
