import { getEmail } from '@/actions';
import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const email = await getEmail();
  const followers = await prisma.follow.findMany({
    where: {
      user: email,
    },
  });
  const profiles= await prisma.profile.findMany({
    where:{
      email :{in : followers.map(item=> item.follower) }
    }
  })
  return NextResponse.json(profiles);
}
