import { getTranslations } from 'next-intl/server';

import ServerProvider from '@/components/providers/ServerProvider';

import { routing } from '@/i18n/routing';

type LocaleLayoutProps = RootProvider & {
  params: { locale: Locale };
};

export async function generateMetadata({ params: { locale } }: LocaleLayoutProps) {
  const t = await getTranslations({ locale });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  return (
    <html lang={locale}>
      <body className="h-screen">
        <ServerProvider locale={locale}>{children}</ServerProvider>
      </body>
    </html>
  );
}
