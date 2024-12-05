import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import Admin from '@/models/adminsModel';

type NextParams = {
  params: {
    adminId: string;
  };
};

export async function DELETE(req: NextRequest, { params }: NextParams) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { adminId } = params;

  try {
    const objectId = new mongoose.Types.ObjectId(adminId);

    const result = await Admin.deleteOne({ _id: objectId });

    if (result?.deletedCount === 0) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Admin is deleted successfully' }, { status: 200 });
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

  const { adminId } = params;

  const updateData = await req.json();

  try {
    const objectId = new mongoose.Types.ObjectId(adminId);
    const updatedAdmin = await Admin.findByIdAndUpdate(objectId, updateData, { new: true });

    if (!updatedAdmin) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json(updatedAdmin, { status: 200 });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    const { status, message } = error as HttpError;

    return NextResponse.json({ message }, { status });
  }
}
