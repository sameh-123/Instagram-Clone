import { post } from '@prisma/client';
import LikesInfo from './LikesInfo';
import { prisma } from '@/db';
import Link from 'next/link';
import BookButton from './BookButton';
import Image from 'next/image';
import fallBack from '/public/default-fallback-image.png';
export default function HomePosts({
  posts,
  Email,
}: {
  posts: post[];
  Email: string;
}) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-16 mt-8 mb-24">
      {posts.map(async (post) => {
        const likeSession = await prisma.like.findFirst({
          where: {
            postId: post.id,
            author: Email,
          },
        });
        const bookSession = await prisma.bookMark.findFirst({
          where: {
            postId: post.id,
            author: Email,
          },
        });
        const user = await prisma.profile.findFirst({
          where: {
            email: post.author,
          },
        });
        return (
          <div className="w-full max-w-2xl flex flex-col gap-2" key={post.id}>
            <div>
              <div className="flex gap-4 items-center py-2 px-1 border-2 border-b-0 rounded-t-lg">
                <Image
                  src={user?.avatar||fallBack}
                  alt={user?.name ||'user'}
                  width={200}
                  height={200}
                  className="size-16 rounded-full object-cover"
                />
                <div className="w-full flex justify-between ">
                  <div>
                    <div>{user?.name}</div>
                    <div className="text-gray-500">@{user?.username}</div>
                  </div>
                  <div className="font-light text-slate-400 text-sm">
                    {post.updatedAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <Link href={`/posts/${post.id}`}>
                <Image
                  src={post.image || fallBack}
                  alt={post.description || "post"}
                  width={200}
                  height={200}
                  className="w-full h-96 md:h-[35rem] object-cover rounded-b-lg shadow-lg shadow-gray-500"
                />
              </Link>
              <div className="my-8 flex items-center justify-between w-full">
                <LikesInfo post={post} likeSession={likeSession} />
                <BookButton post={post} bookSession={bookSession} />
              </div>
              {post.description && (
                <Link href={`/posts/${post.id}`}>
                  <p className="bg-slate-100 dark:bg-slate-800 dark:text-white rounded-b-md p-4 mt-5">
                    {post.description}
                  </p>
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
