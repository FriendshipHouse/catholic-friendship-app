import { AntdRegistry } from '@ant-design/nextjs-registry';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';

import MongoDBProvider from './MongoDBProvider';
import NextAuthProvider from './NextAuthProvider';

type ServerProviderProps = RootProvider & { locale: Locale };

async function ServerProvider({ children, locale }: ServerProviderProps) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <MongoDBProvider>
      <NextAuthProvider>
        <NextIntlClientProvider messages={messages}>
          <AntdRegistry>{children}</AntdRegistry>
        </NextIntlClientProvider>
      </NextAuthProvider>
    </MongoDBProvider>
  );
}

export default ServerProvider;
