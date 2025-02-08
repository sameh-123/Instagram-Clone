'use server';
import { prisma } from '@/db';
import { auth } from './auth';
export async function getEmail() {
  const session = await auth();
  if (!session) {
    throw 'not logged in ...!';
  }
  return session.user?.email as string;
}
export async function updateProfile(data: FormData) {
  // 'use server';
  const userEmail = await getEmail();
  const userInfo = {
    username: data.get('username') as string,
    name: data.get('name') as string,
    subtitle: data.get('subtitle') as string,
    bio: data.get('bio') as string,
    avatar: data.get('avatar') as string,
  };
  await prisma.profile.upsert({
    where: {
      email: userEmail,
    },
    update: userInfo,
    create: {
      email: userEmail,
      ...userInfo,
    },
  });
}

export async function sendPost(data: FormData) {
  const userEmail = await getEmail();
  const postInfo = {
    image: data.get('image') as string,
    description: (data.get('description') || '') as string,
  };
  const post = await prisma.post.create({
    data: {
      author: userEmail,
      ...postInfo,
    },
  });
  return post.id;
}

export async function sendComment(data: FormData) {
  const userEmail = await getEmail();
  await prisma.comment.create({
    data: {
      author: userEmail as string,
      postId: data.get('postId') as string,
      text: (data.get('text') || '') as string,
    },
  });
}

export async function countLikes(postId: string) {
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likesCount: await prisma.like.count({
        where: {
          postId: postId,
        },
      }),
    },
  });
}

export async function addLike(data: FormData) {
  const postId = data.get('postId') as string;
  await prisma.like.create({
    data: {
      postId: postId,
      author: (await getEmail()) as string,
    },
  });
  await countLikes(postId);
}
export async function removeLike(data: FormData) {
  const postId = data.get('postId') as string;
  await prisma.like.deleteMany({
    where: {
      postId: postId,
      author: (await getEmail()) as string,
    },
  });
  await countLikes(postId);
}
export async function addBook(data: FormData) {
  const postId = data.get('postId') as string;
  await prisma.bookMark.create({
    data: {
      postId: postId,
      author: (await getEmail()) as string,
    },
  });
  await countLikes(postId);
}
export async function removeBook(data: FormData) {
  const postId = data.get('postId') as string;
  await prisma.bookMark.deleteMany({
    where: {
      postId: postId,
      author: (await getEmail()) as string,
    },
  });
  await countLikes(postId);
}

export async function addFollow(data: FormData) {
  const userEmail = await getEmail();
  const otherUserEmail = data.get('email') as string;
  await prisma.follow.create({
    data: {
      follower: userEmail,
      user: otherUserEmail,
    },
  });
}
export async function removeFollow(data: FormData) {
  const userEmail = await getEmail();
  const otherUserEmail = data.get('email') as string;
  await prisma.follow.deleteMany({
    where: {
      follower: userEmail,
      user: otherUserEmail,
    },
  });
}
