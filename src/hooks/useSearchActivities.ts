import { useMemo } from 'react';

import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/lib/fetcher';

type SearchActivityParams = {
  categoryIds?: string | string[];
  eventIds?: string | string[];
};

const useSearchActivities = ({ categoryIds, eventIds }: SearchActivityParams) => {
  const checkedCategoryIds = useMemo(() => {
    if (!categoryIds) return [];

    if (typeof categoryIds === 'string') return [categoryIds];
    if (Array.isArray(categoryIds)) return categoryIds;

    return [`${categoryIds}`];
  }, [categoryIds]);

  const checkedEventIds = useMemo(() => {
    if (!eventIds) return [];

    if (typeof eventIds === 'string') return [eventIds];
    if (Array.isArray(eventIds)) return eventIds;

    return [`${eventIds}`];
  }, [eventIds]);

  const shouldFetch = checkedCategoryIds?.length > 0 || checkedEventIds?.length > 0;

  return useSWRImmutable<ActivitiesFormValue[]>(
    shouldFetch && [
      '/api/searchActivities',
      (checkedCategoryIds ?? '').toString(),
      (checkedEventIds ?? '').toString(),
    ],
    () =>
      fetcher('/api/searchActivities', {
        params: { categoryIds: checkedCategoryIds, eventIds: checkedEventIds },
      })
  );
};

export default useSearchActivities;
