'use client';

import { useTranslations } from 'next-intl';
import { Facebook, Line } from 'react-bootstrap-icons';

import LogoCana from '@/components/icon/LogoCana';
import LogoFS from '@/components/icon/LogoFS';

import { Link } from '@/i18n/routing';

const linkItems = [
  { value: 'about', href: '/house/about' },
  { value: 'cana', href: '/cana' },
  { value: 'events', href: '/events/activities' },
  { value: 'upcoming', href: '/upcoming' },
  { value: 'contact', href: '/house/contact' },
  { value: 'donate', href: '/house/donate' },
];

function Footer() {
  const t = useTranslations();
  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-3 border-t border-gray-30 bg-gray-10 p-3 md:flex-row md:justify-around md:gap-2 md:bg-transparent">
      <div className="flex items-center justify-center gap-3 sm:flex-row">
        <div className="flex items-center gap-3">
          <Link href="/" className="footerLogoLink group flex items-center gap-2">
            <LogoFS />
            <div className="hidden text-sm font-medium lg:flex">{t('footer.friendShipCenter')}</div>
          </Link>
          <div className="h-4 rotate-12 border-l border-gray-70 md:hidden"></div>
        </div>
        <div className="hidden h-4 rotate-12 border-l border-gray-70 md:flex"></div>
        <Link href="https://www.lovecana.org.tw/index.php" className="footerLogoLink">
          <LogoCana />
        </Link>
      </div>
      <div className="w-full border-t border-solid border-gray-30 md:h-full md:w-0 md:border-l md:border-t-0"></div>
      <div className="flex flex-wrap justify-center gap-3 py-2 md:py-0">
        <div className="text-gray-60 md:hidden lg:flex">{t('menu.link')}</div>
        <div className="flex flex-wrap justify-center gap-3">
          {linkItems.map(({ value, href }) => (
            <Link key={value} href={href} className="footerTextLink">
              {t(`pathname.${value}`)}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full border-t border-solid border-gray-30 md:h-full md:w-0 md:border-l md:border-t-0"></div>
      <div className="flex items-center gap-4">
        <Link
          href="https://www.facebook.com/groups/113455488704730/?ref=share"
          className="footerLogoLink text-lg"
        >
          <Facebook />
        </Link>
        <Link href="/" className="footerLogoLink text-lg">
          <Line />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
