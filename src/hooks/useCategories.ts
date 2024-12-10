import useSWRImmutable from 'swr/immutable';

import { fetcher } from '@/lib/fetcher';

const useCategories = () => {
  return useSWRImmutable<CategoriesFormValue[]>('/api/categories', fetcher);
};

export default useCategories;
