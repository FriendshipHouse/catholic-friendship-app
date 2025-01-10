import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import connectMongo from '@/lib/connectMongo';
import Poster from '@/models/postersModel';

export async function GET() {
  try {
    await connectMongo();
    const posters = await Poster.find({});

    return NextResponse.json(posters, { status: 200 });
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

  const PosterData = await req.json();

  try {
    const poster = await Poster.create(PosterData);

    return NextResponse.json(poster, { status: 200 });
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
