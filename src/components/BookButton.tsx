'use client';
import { addBook, removeBook } from '@/actions';
import { BookMark, post } from '@prisma/client';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BookButton({
  post,
  bookSession,
}: {
  post: post;
  bookSession: BookMark | null;
}) {
  const postId = post.id;

  const [isLiked, setIsLiked] = useState(!!bookSession);
  const router = useRouter();
  return (
    <form
      action={async (data: FormData) => {
        setIsLiked((prev) => !prev);
        if (isLiked) {
          await removeBook(data);
        } else {
          await addBook(data);
        }
        router.refresh();
      }}
    >
      <input type="hidden" name="postId" value={postId} readOnly />
      <button type="submit">
        <Bookmark className={`${isLiked ? 'fill-yellow-600' : ''}`} />
      </button>
    </form>
  );
}
