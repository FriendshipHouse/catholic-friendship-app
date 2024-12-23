import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import Activity from '@/models/activitiesModel';
import Category from '@/models/categoriesModal';
import Event from '@/models/eventsModel';
import Registrations from '@/models/registrationsModel';

type NextParams = {
  params: {
    categoryId: string;
  };
};

export async function DELETE(req: NextRequest, { params }: NextParams) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { categoryId } = params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const objectId = new mongoose.Types.ObjectId(categoryId);

    const events = await Event.find({ categoryId });
    const activities = await Activity.find({ categoryId });
    const registrations = await Registrations.find({ categoryId });

    const eventIds = (events ?? []).map((_id) => _id).filter((id) => id);
    const activityIds = (activities ?? []).map((_id) => _id).filter((id) => id);
    const registrationIdsIds = (registrations ?? []).map((_id) => _id).filter((id) => id);

    await Event.deleteMany({ _id: eventIds });
    await Activity.deleteMany({ _id: activityIds });
    await Registrations.deleteMany({ _id: registrationIdsIds });

    const result = await Category.deleteOne({ _id: objectId });

    if (result?.deletedCount === 0) {
      await session.abortTransaction();
      session.endSession();

      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
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

  const { categoryId } = params;

  const updatedData = await req.json();

  try {
    const objectId = new mongoose.Types.ObjectId(categoryId);

    const updatedCategory = await Category.findByIdAndUpdate(objectId, updatedData, { new: true });

    if (!updatedCategory) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message } = error as HttpError;

    return NextResponse.json({ message }, { status });
  }
}
