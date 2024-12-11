import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/lib/fetcher';

const useActivities = (categoryId?: string | null, eventId?: string | null) => {
  return useSWRImmutable<ActivitiesFormValue[]>(
    Boolean(categoryId) && Boolean(eventId) && ['/api/activities', categoryId, eventId],
    ([url]) => fetcher(url, { params: { categoryId, eventId } })
  );
};

export default useActivities;
