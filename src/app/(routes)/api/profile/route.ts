import { getEmail } from '@/actions';
import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const email = await getEmail();
  const profile = await prisma.profile.findFirst({
    where: {
      email: email,
    },
  });
  return NextResponse.json(profile);
}
