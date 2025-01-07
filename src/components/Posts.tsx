import { prisma } from '@/db';
import Image from 'next/image';
import fallBack from '/public/default-fallback-image.png';
import Link from 'next/link';

export default async function Posts({ email }: { email: string }) {
  const posts =await prisma.post.findMany({
    where: {
      author: email,
    },
  });
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Image
            src={post.image|| fallBack}
            alt="post"
            width={200}
            height={200}
            className="mb-2 w-full h-[30rem] object-cover rounded-lg"
          />
        </Link>
      ))}
    </div>
  );
}
