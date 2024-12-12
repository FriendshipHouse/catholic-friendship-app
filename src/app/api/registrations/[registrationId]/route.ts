import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import Registration from '@/models/registrationsModel';

type NextParams = {
  params: {
    registrationId: string;
  };
};

export async function PATCH(req: NextRequest, { params }: NextParams) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { registrationId } = params;

  const updatedData = await req.json();

  try {
    const objectId = new mongoose.Types.ObjectId(registrationId);

    const updatedRegistration = await Registration.findByIdAndUpdate(objectId, updatedData, {
      new: true,
    });

    if (!updatedRegistration) {
      return NextResponse.json({ message: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json(updatedRegistration, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message } = error as HttpError;

    return NextResponse.json({ message }, { status });
  }
}
