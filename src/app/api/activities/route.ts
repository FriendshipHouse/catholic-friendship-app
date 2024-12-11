import dayjs from 'dayjs';
import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import connectMongo from '@/lib/connectMongo';
import Activity from '@/models/activitiesModel';

type Query = {
  categoryId?: string;
  eventId?: string;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('eventId');
  const categoryId = searchParams.get('categoryId');

  const query: Query = {};

  if (categoryId) query.categoryId = categoryId;
  if (eventId) query.eventId = eventId;

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

export async function POST(req: NextRequest) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('eventId');
  const categoryId = searchParams.get('categoryId');

  if (!categoryId || !eventId) {
    return NextResponse.json({ message: 'Category Id or Event Id is required' }, { status: 400 });
  }

  const activityData = await req.json();

  if (!Array.isArray(activityData)) {
    return NextResponse.json({ message: 'The Activity data must be an Array.' }, { status: 400 });
  }

  const updateData = (activityData ?? []).map((activity) => ({
    ...activity,
    categoryId,
    eventId,
  }));

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const activity = await Activity.insertMany(updateData, { session });
    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(activity, { status: 200 });
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

  const activityIds = await req.json();

  try {
    const objectIds = activityIds?.map(
      (activityId: string) => new mongoose.Types.ObjectId(activityId)
    );

    const result = await Activity.deleteMany({ _id: objectIds });

    if (result?.deletedCount === 0) {
      return NextResponse.json({ message: 'Activity not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Activity deleted successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message } = error as HttpError;

    return NextResponse.json({ message }, { status });
  }
}
