import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing, {
  localeDetection: true,
});

export const config = {
  matcher: ['/', '/(en-US|zh-TW)/:path*'],
};
