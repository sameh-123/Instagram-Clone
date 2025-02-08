'use client';
import ProfileHeader from '@/components/ProfileHeader';
import { profile } from '@prisma/client';
import { LoaderCircle } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

export default function ProfileLayout({
  children,
  bookMarks,
  followers,
  following,
}: {
  children: ReactNode;
  bookMarks: ReactNode;
  followers: ReactNode;
  following: ReactNode;
}) {
  const [profile, setProfile] = useState<profile | null>(null);
  const [active, setActive] = useState('post');
  useEffect(() => {
    const getData = async () => {
      const data = await fetch('/api/profile');
      const Profile = await data.json();
      setProfile(Profile);
    };
    getData();
  }, []);
  if (!profile)
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <LoaderCircle size={36} className="animate-spin text-igRed" />
      </div>
    );
  return (
    <div className="container mx-auto">
      <ProfileHeader profile={profile} />
      <section className="posts_highlights flex items-center justify-center gap-8 text-[1.5rem] my-16">
        <button
          className={`${active == 'post' ? 'font-semibold' : 'text-gray-400'}`}
          onClick={() => setActive('post')}
        >
          Posts
        </button>
        <button
          className={`${active == 'book' ? 'font-semibold' : 'text-gray-400'}`}
          onClick={() => setActive('book')}
        >
          Book Marks
        </button>
        <button
          className={`${
            active == 'follower' ? 'font-semibold' : 'text-gray-400'
          }`}
          onClick={() => setActive('follower')}
        >
          Followers
        </button>
        <button
          className={`${
            active == 'following' ? 'font-semibold' : 'text-gray-400'
          }`}
          onClick={() => setActive('following')}
        >
          Following
        </button>
      </section>
      {active == 'post' && children}
      {active == 'follower' && followers}
      {active == 'book' && bookMarks}
      {active == 'following' && following}
    </div>
  );
}
