import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/lib/fetcher';

const useAdmins = () => {
  return useSWRImmutable<AdminFormValue[]>('/api/admins', fetcher);
};

export default useAdmins;
