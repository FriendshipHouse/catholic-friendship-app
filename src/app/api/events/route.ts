import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import connectMongo from '@/lib/connectMongo';
import Event from '@/models/eventsModel';

type Query = {
  $or?: { categoryId?: { $in: string[] } }[];
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryIds = searchParams.getAll('categoryIds[]');

  const query: Query = {};

  if (categoryIds.length > 0) {
    query.$or = [];
    query.$or.push({ categoryId: { $in: categoryIds } });
  }

  try {
    await connectMongo();
    const events = await Event.find(query);
    const sortingEvents = (events ?? []).sort((a, b) => (a?.order > b?.order ? 1 : -1));

    return NextResponse.json(sortingEvents, { status: 200 });
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

  const eventData = await req.json();

  try {
    const event = await Event.create(eventData);
    console.log(req, event);
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message, code } = error as HttpError;

    if (code === 11000) {
      return NextResponse.json({ message }, { status: 400 });
    }

    return NextResponse.json({ message }, { status });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');

  if (!categoryId) {
    return NextResponse.json({ message: 'CategoryId is not exist' }, { status: 400 });
  }

  const eventsData = await req.json();

  const updateOrder = eventsData.map((category: EventsFormValue, index: number) => ({
    ...category,
    order: index,
  }));

  try {
    await Event.deleteMany({ categoryId });
    const events = await Event.create(updateOrder);

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message, code } = error as HttpError;

    if (code === 11000) {
      return NextResponse.json({ message }, { status: 400 });
    }

    return NextResponse.json({ message }, { status });
  }
}
