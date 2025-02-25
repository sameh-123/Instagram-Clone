import { NextResponse, NextRequest } from 'next/server';
import { pinata } from '@/config';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const uploadData = await pinata.upload.file(file, {
      groupId: '0192fcc4-7a0c-7dc0-bfe5-d1ebaa6c0ad3',
    });
    const fileUrl = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.cid}`;
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
