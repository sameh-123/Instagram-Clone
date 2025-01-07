'use client';
import { post } from '@prisma/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import fallBack from '/public/default-fallback-image.png';
export default function Profile() {
  const [posts, setPosts] = useState<post[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch('/api/posts');
      const posts = await data.json();
      setPosts(posts);
    };
    getData();
  }, []);
  if (!posts)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoaderCircle size={36} className="animate-spin text-igRed" />
      </div>
    );
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Image
            src={post.image || fallBack}
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
