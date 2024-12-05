import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const locales = ['en-US', 'zh-TW'];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en-US',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
