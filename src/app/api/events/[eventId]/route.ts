import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import Activity from '@/models/activitiesModel';
import Event from '@/models/eventsModel';
import Registrations from '@/models/registrationsModel';

type NextParams = {
  params: {
    eventId: string;
  };
};

export async function DELETE(req: NextRequest, { params }: NextParams) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { eventId } = params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const objectId = new mongoose.Types.ObjectId(eventId);

    const activities = await Activity.find({ eventId });
    const registrations = await Registrations.find({ eventId });

    const activityIds = (activities ?? []).map((_id) => _id).filter((id) => id);
    const registrationIds = (registrations ?? []).map((_id) => _id).filter((id) => id);

    await Activity.deleteMany({ _id: activityIds });
    await Registrations.deleteMany({ _id: registrationIds });

    const result = await Event.deleteOne({ _id: objectId });

    if (result?.deletedCount === 0) {
      await session.abortTransaction();
      session.endSession();

      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message } = error as HttpError;

    return NextResponse.json({ message }, { status });
  }
}

export async function PATCH(req: NextRequest, { params }: NextParams) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { eventId } = params;

  const updatedData = await req.json();

  try {
    const objectId = new mongoose.Types.ObjectId(eventId);

    const updatedEvent = await Event.findByIdAndUpdate(objectId, updatedData, { new: true });

    if (!updatedEvent) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message } = error as HttpError;

    return NextResponse.json({ message }, { status });
  }
}
