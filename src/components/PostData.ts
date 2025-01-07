"use server"
import { prisma } from '@/db';
import { getEmail } from '@/actions';

export async function getPostData(postId:string) {
    
    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
    });
    const user = await prisma.profile.findFirstOrThrow({
      where: {
        email: post.author,
      },
    });
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
    const likeSession = await prisma.like.findFirst({
      where: {
        postId: postId,
        author: (await getEmail()) as string,
      },
    });
    const bookSession = await prisma.bookMark.findFirst({
      where: {
        postId: postId,
        author: (await getEmail()) as string,
      },
    });
    return {post,user,comments,likeSession,bookSession}
}

