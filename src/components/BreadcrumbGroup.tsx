import { useMemo } from 'react';

import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/routing';

function BreadcrumbGroup() {
  const t = useTranslations('pathname');
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (!pathname || pathname === '/') return [];

    const pathnamesWithIndex = ['index'].concat(pathname.split('/').slice(1));

    const pathnamesWithPath = pathnamesWithIndex.map((key, index) => {
      const path = pathnamesWithIndex.slice(0, index + 1).join('/');
      return { path: path === 'index' ? '/' : path.replace('index', ''), key };
    });

    if (
      pathnamesWithPath.length > 1 &&
      pathnamesWithPath[pathnamesWithPath.length - 2].key === 'events'
    ) {
      pathnamesWithPath.pop();
    }

    return pathnamesWithPath;
  }, [pathname]);

  return (
    <div>
      <div className="hidden gap-3 text-sm !text-gray-60 xs:flex">
        {Array.isArray(breadcrumbs) &&
          breadcrumbs.map(({ key, path }, index) => (
            <div
              className="flex items-center gap-3 [&>a:hover]:text-gray-50 [&>a]:text-gray-60"
              key={key}
            >
              <Link href={path}>{t(key)}</Link>
              {index < breadcrumbs.length - 1 && (
                <div className="h-2 rotate-12 border-l border-gray-70" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default BreadcrumbGroup;
