import dayjs from 'dayjs';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/lib/connectMongo';
import Activity from '@/models/activitiesModel';
import Event from '@/models/eventsModel';
import Registrations from '@/models/registrationsModel';

type Query = {
  email: string;
};

export async function GET(req: NextRequest) {
  const { NEXTAUTH_SECRET: secret = '' } = process.env ?? {};

  try {
    const { email } = (await getToken({ req, secret })) ?? {};
    if (!email) {
      return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { email } = (await getToken({ req, secret })) ?? {};

  const query: Query = {
    email: email as string,
  };

  try {
    await connectMongo();
    const registrations = await Registrations.find(query);

    const queryActivityIds = registrations?.map(({ activityId }) => activityId);
    const queryEventIds = registrations?.map(({ eventId }) => eventId);

    const events = await Event.find(
      queryEventIds?.length > 0 ? { $or: [{ _id: { $in: queryEventIds ?? [] } }] } : {}
    );

    const activities = await Activity.find(
      queryActivityIds?.length > 0 ? { $or: [{ _id: { $in: queryActivityIds ?? [] } }] } : {}
    );

    const registrationsData = registrations?.map((registration) => {
      const { name: eventName } =
        events?.find(({ _id }) => _id?.toString() === registration?.eventId) ?? {};

      const {
        date,
        name: activityName,
        time,
        location,
        systemFormInfo,
      } = activities?.find(({ _id }) => _id?.toString() === registration?.activityId) ?? {};

      return {
        _id: registration._id,
        categoryId: registration.categoryId,
        eventId: registration.eventId,
        eventName,
        activityId: registration.activityId,
        activityName,
        date,
        time,
        location,
        systemFormInfo,
      };
    });

    const upcomingActivities = (registrationsData ?? []).filter(({ date }) => {
      if (!date) return false;

      return dayjs(new Date())
        .startOf('day')
        .subtract(1, 'day')
        .isBefore(dayjs(date).startOf('day'));
    });

    const sortingRegistrations = upcomingActivities.sort((a, b) =>
      dayjs(a?.date).isAfter(dayjs(b?.date)) ? 1 : -1
    );

    return NextResponse.json(sortingRegistrations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}
