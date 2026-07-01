'use client';

import { useEffect } from 'react';

import { useRouter } from '@/i18n/routing';

function CanaAbout() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/cana');
  }, [router]);

  return null;
}

export default CanaAbout;
