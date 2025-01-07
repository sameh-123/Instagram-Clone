'use client';
import { post } from '@prisma/client';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BookMarkPage() {
  const [bookMarks, setBookMarks] = useState<post[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch('/api/bookMark');
      const book = await data.json();
      setBookMarks(book);
      setLoading(false);
    };
    getData();
  }, []);
  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoaderCircle size={36} className="animate-spin text-igRed" />
      </div>
    );
  return (
    <div className="md:columns-3 columns-2 gap-4 mb-16">
      {bookMarks?.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Image
            key={post.image}
            src={post?.image}
            alt={post?.author}
            width={200}
            height={200}
            className="mb-4"
          />
        </Link>
      ))}
    </div>
  );
}
