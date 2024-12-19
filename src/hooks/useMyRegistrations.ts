import { useSession } from 'next-auth/react';
import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/lib/fetcher';

export type MyRegistration = {
  _id: string;
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
  const { status } = useSession();
  const isLogin = status === 'authenticated';

  const key = isLogin ? '/api/myRegistrations' : null;

  return useSWRImmutable<MyRegistration[]>(key, fetcher);
};

export default useMyRegistrations;
