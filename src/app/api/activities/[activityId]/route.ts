import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import Activity from '@/models/activitiesModel';

type NextParams = {
  params: {
    activityId: string;
  };
};

export async function PATCH(req: NextRequest, { params }: NextParams) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { activityId } = params;

  const updatedData = await req.json();

  try {
    const objectId = new mongoose.Types.ObjectId(activityId);

    const updatedActivity = await Activity.findByIdAndUpdate(objectId, updatedData, { new: true });

    if (!updatedActivity) {
      return NextResponse.json({ message: 'Activity not found' }, { status: 404 });
    }

    return NextResponse.json(updatedActivity, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message } = error as HttpError;

    return NextResponse.json({ message }, { status });
  }
}
