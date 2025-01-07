import CommentForm from '@/components/CommentForm';
import Comment from '@/components/Comment';
import LikesInfo from '@/components/LikesInfo';
import { BookMark, comment, Like, post, profile } from '@prisma/client';
import BookButton from './BookButton';
import Image from 'next/image';
import fallBack from '/public/default-fallback-image.png';

export default function SinglePostComponent({
  post,
  user,
  comments,
  likeSession,
  bookSession,
  postId,
}: {
  post: post;
  user: profile;
  comments: comment[];
  likeSession: Like | null;
  bookSession: BookMark | null;
  postId: string;
}) {
  return (
    <div className="container mx-auto pt-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <div className="w-full">
          <Image
            src={post?.image || fallBack}
            alt={post?.description || ""}
            width={200}
            height={200}
            className="w-full h-96 md:h-[35rem] object-cover rounded-lg shadow-lg shadow-gray-500"
          />
          <div className="flex items-center justify-between my-4">
            <LikesInfo post={post} likeSession={likeSession} />
            <BookButton post={post} bookSession={bookSession} />
          </div>
        </div>
        <div>
          <div className="flex gap-4 items-center">
            <Image
              src={user?.avatar || fallBack}
              alt={user?.name || ""}
              width={200}
              height={200}
              className="size-16 rounded-full object-cover"
            />
            <div className="w-full flex justify-between">
              <div>
                <div>{user.name}</div>
                <div className="text-gray-500">@{user.username}</div>
              </div>
              <div className="font-light text-slate-400 text-sm">
                {post.updatedAt.toLocaleDateString()}
              </div>
            </div>
          </div>
          {post.description && (
            <p className="bg-slate-200 dark:bg-slate-800 rounded-md p-4 mt-5 lg:ml-20">
              {post.description}
            </p>
          )}

          {/* comments */}
          <div className="mt-5 lg:ml-20">
            {comments.length > 0 && (
              <div className="border p-2 divide-y-2 rounded-md max-h-[25rem] overflow-y-scroll">
                <div className="py-2 font-semibold">comments..</div>
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            )}
            <CommentForm postId={postId} />
          </div>
        </div>
      </div>
    </div>
  );
}
