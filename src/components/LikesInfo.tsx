'use client';
import { addLike, removeLike } from '@/actions';
import { Like, post } from '@prisma/client';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LikesInfo({
  post,
  likeSession,
}: {
  post: post;
  likeSession: Like | null;
}) {
  const postId = post.id;

  const [isLiked, setIsLiked] = useState(!!likeSession);
  const router = useRouter();
  return (
    <form
      action={async (data: FormData) => {
        setIsLiked((prev) => !prev);
        if (isLiked) {
          await removeLike(data);
        } else {
          await addLike(data);
        }
        router.refresh();
      }}
    >
      <input type="hidden" name="postId" value={postId} readOnly />
      <div className="flex items-center gap-2">
        <button type="submit">
          <Heart className={`${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
        <div>{post.likesCount} people like this post</div>
      </div>
    </form>
  );
}
