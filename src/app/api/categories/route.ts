import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import connectMongo from '@/lib/connectMongo';
import Category from '@/models/categoriesModal';

export async function GET() {
  try {
    await connectMongo();
    const categories = await Category.find({});
    const sortingCategories = (categories ?? []).sort((a, b) => (a?.order > b?.order ? 1 : -1));

    return NextResponse.json(sortingCategories, { status: 200 });
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

  const categoryData = await req.json();

  try {
    const category = await Category.create(categoryData);

    return NextResponse.json(category, { status: 200 });
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

  const categoriesData = await req.json();

  const updateOrder = categoriesData.map((category: CategoriesFormValue, index: number) => ({
    ...category,
    order: index,
  }));

  try {
    await Category.deleteMany({});
    const categories = await Category.insertMany(updateOrder);

    return NextResponse.json(categories, { status: 200 });
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
