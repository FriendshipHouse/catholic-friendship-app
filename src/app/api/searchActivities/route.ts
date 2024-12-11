import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/lib/connectMongo';
import Activity from '@/models/activitiesModel';

type Query = {
  $or?: { categoryId?: { $in: string[] }; eventId?: { $in: string[] } }[];
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryIds = searchParams.getAll('categoryIds[]');
  const eventIds = searchParams.getAll('eventIds[]');

  const query: Query = {};

  if (categoryIds.length > 0 || eventIds.length > 0) {
    query.$or = [];

    if (categoryIds.length > 0) {
      query.$or.push({ categoryId: { $in: categoryIds } });
    }

    if (eventIds.length > 0) {
      query.$or.push({ eventId: { $in: eventIds } });
    }
  } else {
    return NextResponse.json([], { status: 200 });
  }

  try {
    await connectMongo();
    const activities = await Activity.find(query);
    const sortingActivities = (activities ?? []).sort((a, b) =>
      dayjs(a?.date).isAfter(dayjs(b?.date)) ? 1 : -1
    );

    return NextResponse.json(sortingActivities, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}
