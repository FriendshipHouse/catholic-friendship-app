import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/lib/fetcher';

const useEventByCategoryId = (categoryId?: boolean | string | null) => {
  return useSWRImmutable<EventsFormValue[]>(
    Boolean(categoryId) && ['/api/events', categoryId],
    ([url]) => fetcher(url, { params: { categoryIds: [categoryId] } })
  );
};

export default useEventByCategoryId;
