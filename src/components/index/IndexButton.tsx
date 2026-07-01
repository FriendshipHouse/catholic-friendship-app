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

  const isExternal = pathname.startsWith('http://') || pathname.startsWith('https://');

  const onClick = () => {
    if (isExternal) {
      window.open(pathname, '_blank', 'noopener,noreferrer');
    } else {
      router.push({ pathname });
    }
  };

  return (
    <Button
      type="default"
      className="!group !w-full !bg-gray-20/60 !py-6 !text-gray-80 !shadow-4xl !backdrop-blur !duration-150 hover:!bg-gray-10 md:!max-w-56"
      onClick={onClick}
    >
      <div className="w-full flex items-center justify-between text-[16px] font-semibold md:text-lg text-wrap leading-tight text-left">
        {children}
        <ArrowRightShort className="text-2xl hover:text-primary" />
      </div>
    </Button>
  );
}

export default IndexButton;
