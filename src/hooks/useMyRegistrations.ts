import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/lib/fetcher';

type MyRegistration = {
  categoryId: string;
  eventId: string;
  eventName: string;
  activityId: string;
  activityName: string;
  date: string;
  time: string[];
  location: string;
  systemFormInfo: {
    dueDate: string;
    extraFields: string[];
    detail: string;
    notice: string;
  };
};

const useMyRegistrations = () => {
  return useSWRImmutable<MyRegistration[]>('/api/myRegistrations', fetcher);
};

export default useMyRegistrations;
