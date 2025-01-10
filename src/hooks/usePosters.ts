import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/lib/fetcher';

const usePosters = () => {
  return useSWRImmutable<PosterFormValue[]>('/api/posters', fetcher);
};

export default usePosters;
