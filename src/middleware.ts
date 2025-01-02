import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';

const locales = ['en-US', 'zh-TW'];
const defaultLocale = 'zh-TW';

export default createMiddleware(routing);

export function middleware(req: NextRequest) {
  const acceptLanguage = req.headers.get('accept-language') ?? '';
  const browserLocale = acceptLanguage.split('')[0];

  const locale = locales.includes(browserLocale) ? browserLocale : defaultLocale;

  const pathname = req.nextUrl.pathname;
  if (!pathname.startsWith(`/${locale}`)) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/(en-US|zh-TW)/:path*'],
};
