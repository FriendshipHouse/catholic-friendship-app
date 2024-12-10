import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import Category from '@/models/categoriesModal';

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

  try {
    const objectId = new mongoose.Types.ObjectId(categoryId);

    const result = await Category.deleteOne({ _id: objectId });

    if (result?.deletedCount === 0) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
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
