'use client';

import { useMemo } from 'react';

import { useTranslations } from 'next-intl';

import SubMenu from '@/components/management/SubMenu';
import BatchRemoveActivitiesButton from '@/components/management/activities/BatchRemoveActivitiesButton';
import BatchRemoveRegistrationsButton from '@/components/management/registers/BatchRemoveRegistrationsButton';
import ExportRegistrationsButton from '@/components/management/registers/ExportRegistrationsButton';

import { usePathname } from '@/i18n/routing';

function SystemLayout({ children }: Readonly<RootProvider>) {
  const t = useTranslations();
  const pathname = usePathname();

  const title = useMemo<string>(() => {
    const pathnames = pathname.split('/');
    const pageName = pathnames[pathnames.length - 1];

    return pageName;
  }, [pathname]);

  return (
    <div className="flex min-h-full w-full bg-white">
      <div className="mx-auto flex w-full px-5">
        <div className="flex min-w-56 flex-col gap-10 border-r border-gray-30 py-10 pr-5">
          <SubMenu />
        </div>
        <div className="flex w-[calc(100%-208px)] flex-col py-10 px-5">
          <div className="flex justify-between border-b border-gray-40 pb-4">
            <div className="min-h-[32px] flex items-center gap-4 text-lg font-semibold">
              {t(`management.${title}`)}
            </div>
            <div className="flex items-center justify-end gap-4">
              <ExportRegistrationsButton />
              <BatchRemoveActivitiesButton />
              <BatchRemoveRegistrationsButton />
            </div>
          </div>
          <div className="h-full w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default SystemLayout;
