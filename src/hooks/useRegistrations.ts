import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/lib/fetcher';

type SearchRegistrationParams = {
  categoryId?: string;
  eventId?: string;
  activityId?: string;
};

export type Registration = {
  _id: string;
  categoryId: string;
  eventId: string;
  eventName: string;
  activityId: string;
  activityName: string;
  date: string;
  time: string[];
  location: string;
  fullName: string;
  email: string;
  birthday?: string;
  id?: string;
  phone: string;
  lineId?: string;
  parish?: string;
  sharePicture: string;
  knowInfo: string[];
  beenHere: string;
  submissionTime: string;
  otherKnowInfo: string;
};

const useRegistrations = ({ categoryId, eventId, activityId }: SearchRegistrationParams = {}) => {
  const shouldFetch = categoryId && eventId;

  return useSWRImmutable<Registration[]>(
    shouldFetch && ['/api/registrations', categoryId, eventId, activityId],
    () => fetcher('/api/registrations', { params: { categoryId, eventId, activityId } })
  );
};

export default useRegistrations;
