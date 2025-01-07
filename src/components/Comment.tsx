import { prisma } from '@/db';
import { comment } from '@prisma/client';
import Image from 'next/image';
import fallBack from '/public/default-fallback-image.png';

export default async function Comment({ comment }: { comment: comment }) {
  const userEmail = comment.author;
  const user = await prisma.profile.findFirstOrThrow({
    where: {
      email: userEmail,
    },
  });
  return (
    <div className="py-6">
      <div className="flex gap-4 items-center">
        <Image
          src={user.avatar || fallBack}
          alt={user.name}
          width={200}
          height={200}
          className="size-16 rounded-full object-cover"
        />
        <div className="w-full flex justify-between">
          <div>
            <div>{user.name}</div>
            <div className="text-gray-500">@{user.username}</div>
          </div>
          <div className="font-light text-slate-500 dark:text-slate-300 text-sm">
            <div>{comment.updatedAt.toLocaleDateString()}</div>
            <div>{comment.updatedAt.toLocaleTimeString()}</div>
          </div>
        </div>
      </div>

      <p className="bg-slate-200 dark:bg-slate-800 rounded-md p-4 mt-5">
        {comment.text}
      </p>
    </div>
  );
}
