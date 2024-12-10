import { PutBlobResult } from '@vercel/blob';
import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/lib/fetcher';

const useImages = (prefix: 'categories/images' | 'activities/images') => {
  return useSWRImmutable<PutBlobResult[]>(prefix && `/api/images?prefix=${prefix}`, fetcher);
};

export default useImages;
