'use client';

import { useEffect } from 'react';

import { useSetAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';

import CategorySelector from '@/components/management/CategorySelector';
import EventSelector from '@/components/management/EventSelector';
import RegisterFormTable from '@/components/management/registers/RegisterFormTable';

import useCategories from '@/hooks/useCategories';
import useEventsByCategoryId from '@/hooks/useEventsByCategoryId';
import { usePathname, useRouter } from '@/i18n/routing';
import { registrationSelectionRows } from '@/jotai/managementRegistration';

function RegisterManage() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categoryId = searchParams.get('categoryId');
  const eventId = searchParams.get('eventId');

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: events, isLoading: isEventsLoading } = useEventsByCategoryId(
    categoryId ?? categories?.[0]?._id
  );

  const setSelectionRows = useSetAtom(registrationSelectionRows);

  useEffect(() => {
    if (isCategoriesLoading || isEventsLoading || !categories || !events) return;

    const params = new URLSearchParams(searchParams.toString());
    const prevUrl = params.toString();

    if (!categoryId) {
      params.set('categoryId', categories?.[0]?._id);
    }

    if (!eventId) {
      params.set('eventId', events?.[0]?._id);
    }

    const nextUrl = params.toString();
    if (prevUrl !== nextUrl) {
      push(`${pathname}?${params.toString()}`);
    }
  }, [
    categories,
    categoryId,
    eventId,
    events,
    isCategoriesLoading,
    isEventsLoading,
    pathname,
    push,
    searchParams,
  ]);

  useEffect(() => {
    return () => {
      setSelectionRows([]);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-center gap-8">
        <CategorySelector onChange={() => setSelectionRows([])} />
        {events && <div className="h-4 rotate-12 border-l border-gray-50" />}
        <div className="flex items-end">
          <EventSelector onChange={() => setSelectionRows([])} />
        </div>
      </div>
      <RegisterFormTable />
    </div>
  );
}

export default RegisterManage;
