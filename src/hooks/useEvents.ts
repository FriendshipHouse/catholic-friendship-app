import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/lib/fetcher';

const useEvents = () => {
  return useSWRImmutable<EventsFormValue[]>('/api/events', fetcher);
};

export default useEvents;
