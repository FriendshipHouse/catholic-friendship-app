import { del, list, put } from '@vercel/blob';
import { HttpError } from 'http-errors';
import { NextRequest, NextResponse } from 'next/server';

import { checkAuthorization } from '@/lib/checkAuthorization';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const prefix = searchParams.get('prefix');

  if (!prefix) NextResponse.json({ message: 'Prefix is not exist' }, { status: 400 });

  try {
    const { blobs } = await list({ prefix: prefix! });

    return NextResponse.json(blobs, { status: 200 });
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

  const { searchParams } = new URL(req.url);
  const filename = searchParams.get('filename');
  const prefix = searchParams.get('prefix');

  if (!prefix) NextResponse.json({ message: 'Prefix is not exist' }, { status: 400 });

  if (!filename || !req.body) {
    return NextResponse.json({ message: 'invalid file data' }, { status: 400 });
  }

  try {
    const blob = await put(`${prefix}/${filename}`, req.body, {
      access: 'public',
    });

    return NextResponse.json(blob, { status: 200 });
  } catch (error) {
    const { status, message } = error as HttpError;

    return NextResponse.json({ message }, { status });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await checkAuthorization(req);
  } catch (error) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const urlToDelete = searchParams.get('url') as string;

  if (!urlToDelete) {
    return NextResponse.json({ message: 'invalid file url' }, { status: 400 });
  }

  try {
    await del(urlToDelete);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    const { status, message } = error as HttpError;

    return NextResponse.json({ message }, { status });
  }
}
