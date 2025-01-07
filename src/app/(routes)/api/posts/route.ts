import { getEmail } from '@/actions';
import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const email = await getEmail();
  const posts = await prisma.post.findMany({
    where: {
      author: email,
    },
  });
  return NextResponse.json(posts);
}
