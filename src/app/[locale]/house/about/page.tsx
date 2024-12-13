'use client';

import { useEffect } from 'react';

import { useRouter } from '@/i18n/routing';

function About() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/house');
  }, [router]);

  return null;
}

export default About;
