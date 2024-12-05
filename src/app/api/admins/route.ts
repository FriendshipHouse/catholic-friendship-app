import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';
import connectMongo from '@/lib/connectMongo';
import Admin from '@/models/adminsModel';

export async function GET() {
  try {
    await connectMongo();
    const admins = await Admin.find({});

    return NextResponse.json(admins, { status: 200 });
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

  const AdminData = await req.json();

  try {
    const admin = await Admin.create(AdminData);

    return NextResponse.json(admin, { status: 200 });
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
