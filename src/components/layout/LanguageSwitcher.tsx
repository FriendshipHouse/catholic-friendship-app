'use client';

import { Button, Dropdown, MenuProps } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { Translate } from 'react-bootstrap-icons';

import { locales, usePathname, useRouter } from '@/i18n/routing';

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('locale');
  const locale = useLocale();

  const items: MenuProps['items'] = locales.map((localeKey) => ({
    label: t(localeKey),
    key: localeKey,
  }));

  const onClick: MenuProps['onClick'] = ({ key }) => {
    router.replace({ pathname }, { locale: key });
  };

  return (
    <div className="flex items-center">
      <Dropdown
        menu={{ items, onClick }}
        trigger={['click']}
        placement="bottom"
        overlayClassName="!pt-[14px]"
        className="headerLink"
      >
        <Button
          type="link"
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-1 !p-0 !font-semibold"
        >
          <div className="text-sm lg:text-[16px]">
            <Translate />
          </div>
          <div>{t(locale)}</div>
        </Button>
      </Dropdown>
    </div>
  );
}

export default LanguageSwitcher;
