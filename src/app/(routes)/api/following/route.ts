import { getEmail } from '@/actions';
import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const email = await getEmail();
  const following = await prisma.follow.findMany({
    where: {
      follower: email,
    },
  });
  const profiles = await prisma.profile.findMany({
    where: {
      email: { in: following.map((item) => item.user) },
    },
  });
  return NextResponse.json(profiles);
}
