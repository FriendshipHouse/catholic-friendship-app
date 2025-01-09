'use client';

import { SetStateAction, useEffect, useState } from 'react';

import { AppstoreOutlined, CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Tabs, TreeSelect, TreeSelectProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import ActivityModal from '@/components/activity/ActivityModal';
import ActivitiesInputSearch from '@/components/upcoming/ActivitiesInputSearch';
import DateSelectFilter from '@/components/upcoming/DateSelectFilter';
import ActivityCalendar from '@/components/upcoming/views/ActivityCalendar';
import ActivityList from '@/components/upcoming/views/ActivityList';
import ActivityCard from '@/components/ActivityCard';

import useCategories from '@/hooks/useCategories';
import useEvents from '@/hooks/useEvents';
import useSearchActivities from '@/hooks/useSearchActivities';
import { upcomingDate } from '@/jotai/upcomingDate';

function Upcoming() {
  const t = useTranslations();
  const { SHOW_PARENT } = TreeSelect;

  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);
  const [tabSelect, setTabSelect] = useState<string>('list');

  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [eventIds, setEventIds] = useState<string[]>([]);

  const [searchData, setSearchData] = useState<string>('');
  const [selectedDateRange] = useAtom(upcomingDate);

  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  const { data: events = [], isLoading: isEventsLoading } = useEvents();
  const { data: activities = [], isLoading: isSearchActivitiesLoading } = useSearchActivities({
    categoryIds,
    eventIds,
  });
  const isLoading = isCategoriesLoading || isEventsLoading || isSearchActivitiesLoading;

  const [start, end] = selectedDateRange;
  const startDate = start || null;
  const endDate = end || null;
  dayjs.extend(isBetween);

  const filteredData = activities.filter((activity) => {
    if (typeof activity.date !== 'string' || !activity.name) return false;

    if (!startDate || !endDate) return false;

    const activityDate = dayjs(activity.date, 'YYYY/MM/DD');
    if (!activityDate.isValid()) return false;

    if (!activityDate.isBetween(startDate, endDate, null, '[]')) {
      return false;
    }

    return activity.name.toLowerCase().includes(searchData.toLowerCase());
  });

  const calendarFilteredData = activities.filter((activity) => {
    if (!activity.name) return false;

    return activity.name.toLowerCase().includes(searchData.toLowerCase());
  });

  useEffect(() => {
    if (!isCategoriesLoading) {
      const defaultTreeData = categories.map(({ _id: categoryId, name }) => ({
        id: categoryId,
        pId: 0,
        value: categoryId,
        title: name,
      }));
      const defaultCategoryIds = categories.map(({ _id }) => _id);

      setTreeData(defaultTreeData);
      setCategoryIds(defaultCategoryIds);
    }
  }, [categories, isCategoriesLoading]);

  const onLoadData: TreeSelectProps['loadData'] = async (node) => {
    const { pId: parentId, id: categoryId } = node;
    if (parentId > 0) return;

    if (parentId === 0) {
      try {
        const fetchEvents = await axios
          .get('/api/events', { params: { categoryIds: [categoryId] } })
          .then((res) => res.data);

        const eventsData = fetchEvents.map(({ _id, name }: EventsFormValue) => ({
          id: _id,
          value: _id,
          pId: categoryId,
          title: name,
          isLeaf: true,
        }));

        setTreeData(treeData.concat(eventsData));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const defaultTabItems = [
    {
      key: 'list',
      label: t('upcoming.list'),
      icon: <UnorderedListOutlined />,
    },
    {
      key: 'grid',
      label: t('upcoming.grid'),
      icon: <AppstoreOutlined />,
    },
  ];
  const calendarTabItem = [
    {
      key: 'calendar',
      label: t('upcoming.calendar'),
      icon: <CalendarOutlined />,
    },
  ];
  const tabItems = [...defaultTabItems, ...calendarTabItem];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center justify-between gap-4">
        <div className="absolute h-full w-full border-b border-solid border-primary-30" />
        <Tabs
          items={tabItems}
          className="[&>.ant-tabs-nav]:!mb-0 [&_.ant-tabs-nav-operations]:!hidden [&_.ant-tabs-tab:nth-child(3)]:!hidden sm:[&_.ant-tabs-tab:nth-child(3)]:!block"
          onChange={(key) => setTabSelect(key)}
        />
        <div className="flex w-full max-w-[50%] justify-end gap-4">
          <ActivitiesInputSearch loading={isLoading} onChange={setSearchData} />
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-2 text-nowrap sm:flex-row sm:items-center sm:gap-4">
        <div className="flex w-full flex-col justify-center gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="hidden text-gray-60 sm:flex">{t('upcoming.filter')}</div>
          </div>
          <TreeSelect
            className="w-full"
            placeholder={t('upcoming.treeSelectPlaceholder')}
            value={categoryIds.concat(eventIds)}
            notFoundContent={t('emptyText.treeSelect')}
            treeDataSimpleMode
            multiple
            treeCheckable
            showSearch={false}
            showCheckedStrategy={SHOW_PARENT}
            treeData={treeData}
            loadData={onLoadData}
            onChange={(ids) => {
              const categoryMap = new Map(categories?.map((category) => [category?._id, category]));
              const eventMap = new Map(events?.map((event) => [event?._id, event]));

              const currentCategoryIds: SetStateAction<string[]> = [];
              const currentEventIds: SetStateAction<string[]> = [];

              ids.forEach((id) => {
                if (categoryMap.get(id)) {
                  currentCategoryIds.push(id);
                } else if (eventMap.get(id)) {
                  currentEventIds.push(id);
                }
              });

              setCategoryIds(currentCategoryIds);
              setEventIds(currentEventIds);
            }}
          />
        </div>
        {tabSelect !== 'calendar' && <DateSelectFilter />}
      </div>
      {tabSelect === 'list' && <ActivityList activities={filteredData} isLoading={isLoading} />}
      {tabSelect === 'grid' && <ActivityCard activities={filteredData} isLoading={isLoading} />}
      {tabSelect === 'calendar' && <ActivityCalendar activities={calendarFilteredData} />}
      <ActivityModal />
    </div>
  );
}

export default Upcoming;
