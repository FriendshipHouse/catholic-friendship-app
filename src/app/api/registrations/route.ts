import dayjs from 'dayjs';
import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import connectMongo from '@/lib/connectMongo';
import Activity from '@/models/activitiesModel';
import Event from '@/models/eventsModel';
import Registrations from '@/models/registrationsModel';

type Query = {
  categoryId?: string;
  eventId?: string;
  activityId?: string;
};

export async function GET(req: NextRequest) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const categoryId = searchParams.get('categoryId');
  const eventId = searchParams.get('eventId');
  const activityId = searchParams.get('activityId');

  const query: Query = {};

  if (categoryId) query.categoryId = categoryId;
  if (eventId) query.eventId = eventId;
  if (activityId) query.activityId = activityId;

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
        fullName: registration.fullName,
        email: registration.email,
        birthday: registration.birthday,
        id: registration.id,
        phone: registration.phone,
        lineId: registration.lineId,
        parish: registration.parish,
        sharePicture: registration.sharePicture,
        knowInfo: registration.knowInfo,
        beenHere: registration.beenHere,
        submissionTime: registration.submissionTime,
        otherKnowInfo: registration.otherKnowInfo,
      };
    });

    const sortingRegistrations = (registrationsData ?? []).sort((a, b) =>
      dayjs(a?.date).isAfter(dayjs(b?.date)) ? 1 : -1
    );

    return NextResponse.json(sortingRegistrations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { NEXTAUTH_SECRET: secret = '' } = process.env ?? {};
  const token = await getToken({ req, secret });
  const isLogin = Boolean(token);

  if (!isLogin) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const registrationsData = await req.json();

  if (!Array.isArray(registrationsData)) {
    return NextResponse.json({ message: 'The Activity data must be an Array.' }, { status: 400 });
  }

  const isIdsValidationFailed = registrationsData?.some(
    ({ categoryId, eventId, activityId }) => !categoryId || !eventId || !activityId
  );

  if (isIdsValidationFailed) {
    return NextResponse.json(
      { message: 'The Category ID, Event ID, and Activity ID are all required.' },
      { status: 400 }
    );
  }

  const submissionTime = new Date().toISOString();

  const updateData = registrationsData.map((registration) => ({
    categoryId: registration.categoryId,
    eventId: registration.eventId,
    activityId: registration.activityId,
    fullName: registration.fullName,
    email: registration.email,
    birthday: registration.birthday,
    id: registration.id,
    phone: registration.phone,
    lineId: registration.lineId,
    parish: registration.parish,
    sharePicture: registration.sharePicture,
    knowInfo: registration.knowInfo,
    beenHere: registration.beenHere,
    submissionTime,
    otherKnowInfo: registration.otherKnowInfo,
  }));

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const registration = await Registrations.insertMany(updateData, { session });
    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(registration, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      await session.abortTransaction();
      session.endSession();

      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message, code } = error as HttpError;

    await session.abortTransaction();
    session.endSession();

    if (code === 11000) {
      return NextResponse.json({ message }, { status: 400 });
    }

    return NextResponse.json({ message }, { status });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const registrationIds = await req.json();

  try {
    const objectIds = registrationIds?.map(
      (registrationId: string) => new mongoose.Types.ObjectId(registrationId)
    );

    const result = await Registrations.deleteMany({ _id: objectIds });

    if (result?.deletedCount === 0) {
      return NextResponse.json({ message: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Registration deleted successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message } = error as HttpError;

    return NextResponse.json({ message }, { status });
  }
}
