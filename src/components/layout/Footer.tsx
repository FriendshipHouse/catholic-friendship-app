'use client';

import { useState } from 'react';

import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import { Facebook, Line } from 'react-bootstrap-icons';

import LogoCana from '@/components/icon/LogoCana';
import LogoFS from '@/components/icon/LogoFS';

import { Link } from '@/i18n/routing';

import LineModal from './LineModal';

const linkItems = [
  { value: 'about', href: '/house/about' },
  { value: 'cana', href: '/cana' },
  { value: 'events', href: '/events' },
  { value: 'upcoming', href: '/upcoming' },
  { value: 'contact', href: '/house/contact' },
  { value: 'donate', href: '/house/donate' },
];

function Footer() {
  const t = useTranslations();

  const [lineModalOpen, setLineModalOpen] = useState(false);

  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-3 border-t border-gray-30 bg-gray-10 p-3 md:flex-row md:justify-around md:gap-2 md:bg-transparent">
      <div className="flex items-center justify-center gap-3 sm:flex-row">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="footerLogoLink group flex items-center gap-2"
            aria-label="Go to index page"
          >
            <LogoFS />
            <div className="hidden text-sm font-medium lg:flex">{t('footer.friendshipCenter')}</div>
          </Link>
          <div className="h-4 rotate-12 border-l border-gray-70 md:hidden" />
        </div>
        <div className="hidden h-4 rotate-12 border-l border-gray-70 md:flex" />
        <Link
          href="https://www.lovecana.org.tw/index.php"
          target="_blank"
          className="footerLogoLink"
          aria-label="Go out to love cana page"
        >
          <LogoCana />
        </Link>
      </div>
      <div className="w-full border-t border-solid border-gray-30 md:h-full md:w-0 md:border-l md:border-t-0" />
      <div className="flex flex-wrap justify-center gap-3 py-2 md:py-0">
        <div className="text-gray-60 md:hidden lg:flex">{t('menu.link')}</div>
        <div className="flex flex-wrap justify-center gap-3">
          {linkItems.map(({ value, href }) => (
            <Link
              key={value}
              href={href}
              className="footerTextLink"
              aria-label={`Go to ${value} page`}
            >
              {t(`pathname.${value}`)}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full border-t border-solid border-gray-30 md:h-full md:w-0 md:border-l md:border-t-0" />
      <div className="flex items-center gap-4">
        <Link
          href="https://www.facebook.com/groups/113455488704730/?ref=share"
          target="_blank"
          className="footerLogoLink text-lg"
          aria-label="Go out to facebook page"
        >
          <Facebook />
        </Link>
        <Button
          type="text"
          className="footerLogoLink text-lg !p-0 hover:!bg-transparent !w-5"
          onClick={() => setLineModalOpen(true)}
          aria-label="Show a model of Line ID"
        >
          <Line className="w-full h-full" />
        </Button>
        <LineModal open={lineModalOpen} setOpen={setLineModalOpen} />
      </div>
    </div>
  );
}

export default Footer;
