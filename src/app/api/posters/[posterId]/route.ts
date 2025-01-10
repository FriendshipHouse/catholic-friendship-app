import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import Poster from '@/models/postersModel';

type NextParams = {
  params: {
    posterId: string;
  };
};

export async function DELETE(req: NextRequest, { params }: NextParams) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { posterId } = params;

  try {
    const objectId = new mongoose.Types.ObjectId(posterId);

    const result = await Poster.deleteOne({ _id: objectId });

    if (result?.deletedCount === 0) {
      return NextResponse.json({ message: 'Poster not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Poster is deleted successfully' }, { status: 200 });
  } catch (error) {
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

  const { posterId } = params;

  const updateData = await req.json();

  try {
    const objectId = new mongoose.Types.ObjectId(posterId);
    const updatedPoster = await Poster.findByIdAndUpdate(objectId, updateData, { new: true });

    if (!updatedPoster) {
      return NextResponse.json({ message: 'Poster not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPoster, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message } = error as HttpError;

    return NextResponse.json({ message }, { status });
  }
}
