import { getEmail } from '@/actions';
import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const email = await getEmail();
  const books = await prisma.bookMark.findMany({
    where: {
      author: email,
    },
  });
  const bookMarks = await prisma.post.findMany({
    where:{
      id :{in : books.map(item=> item.postId)}
    }
  })
  return NextResponse.json(bookMarks);
}
