import { getTranslations } from 'next-intl/server';

import GoogleAnalytics from '@/components/GoogleAnalytics';
import PageLayout from '@/components/layout/PageLayout';
import ClientProvider from '@/components/providers/ClientProvider';
import ServerProvider from '@/components/providers/ServerProvider';

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

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  return (
    <html lang={locale}>
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        <ServerProvider locale={locale}>
          <ClientProvider>
            <PageLayout>{children}</PageLayout>
          </ClientProvider>
        </ServerProvider>
      </body>
    </html>
  );
}
