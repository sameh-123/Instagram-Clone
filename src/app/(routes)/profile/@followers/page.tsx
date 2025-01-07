'use client';
import { profile } from '@prisma/client';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import fallBack from '/public/default-fallback-image.png';
export default function FollowersPage() {
  const [followers, setFollowers] = useState<profile[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch('/api/followers');
      const followers = await data.json();
      setFollowers(followers);
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
    <div className="flex items-center gap-4 flex-wrap">
      {followers?.map((profile) => (
        <Link
          key={profile.id}
          href={`/user/${profile.id}`}
          className="flex items-start gap-2"
        >
          <Image
            src={profile?.avatar || fallBack}
            alt={profile?.name}
            width={200}
            height={200}
            className="size-20 rounded-full object-cover"
          />
          <div>
            <div>{profile?.name}</div>
            <div className="text-slate-600">@{profile.username}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
