'use client';
import { TextArea, Button } from '@radix-ui/themes';
import { sendComment } from '@/actions';
import { useRouter } from 'next/navigation';
export default function CommentForm({ postId }: { postId: string }) {
  const router = useRouter();
  return (
    <form
      className="mt-5 mb-24 lg:mb-5"
      action={async (data) => {
        await sendComment(data);
        router.refresh();
      }}
    >
      <input
        type="text"
        className="hidden"
        name="postId"
        value={postId}
        readOnly
      />
      <TextArea placeholder="what do you think ... ?" name="text" />
      <Button
        variant="solid"
        className="bg-gradient-to-tr from-igRed to-igOrange mt-5"
      >
        send comment
      </Button>
    </form>
  );
}
