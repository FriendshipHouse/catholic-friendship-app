'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import CategorySelector from '@/components/management/CategorySelector';
import EventsFormTable from '@/components/management/events/EventsFormTable';

import useCategories from '@/hooks/useCategories';
import { usePathname, useRouter } from '@/i18n/routing';

function EventsManage() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categoryId = searchParams.get('categoryId');

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();

  useEffect(() => {
    if (isCategoriesLoading || !categories) return;

    const params = new URLSearchParams(searchParams.toString());
    const prevUrl = params.toString();

    if (!categoryId) {
      params.set('categoryId', categories?.[0]?._id);
    }

    const nextUrl = params.toString();
    // for first mounted default selected
    if (prevUrl !== nextUrl) {
      push(`${pathname}?${params.toString()}`);
    }
  }, [categories, categoryId, isCategoriesLoading, pathname, push, searchParams]);
  return (
    <div className="flex flex-col gap-4 p-5">
      <CategorySelector />
      <EventsFormTable />
    </div>
  );
}

export default EventsManage;
