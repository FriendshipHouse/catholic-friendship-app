'use client';

import { useEffect } from 'react';

import { useRouter } from '@/i18n/routing';

function System() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/management/index');
  }, [router]);

  return null;
}

export default System;
