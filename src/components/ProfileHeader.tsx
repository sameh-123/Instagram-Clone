import Link from 'next/link';
import { Check, Cog, LoaderCircle } from 'lucide-react';
import BackButton from './BackButton';
import { profile } from '@prisma/client';
import Image from 'next/image';
import fallBack from '/public/default-fallback-image.png';
export default function ProfileHeader({
  profile,
}: {
  profile: profile | null;
}) {
  const isMe = true;
  if (!profile) return (
    <div className="w-full h-full flex items-center justify-center">
      <LoaderCircle size={36} className="animate-spin text-igRed" />
    </div>
  );;
  return (
    <div className="my-10">
      <section className="header flex justify-between items-center">
        <BackButton />
        <div className="flex items-center gap-2 md:text-[1.5rem] text-[1.2rem] font-bold">
          {profile.username}
          <div className="bg-igRed rounded-full text-center p-1">
            <Check className="text-white" />
          </div>
        </div>
        {
          <Link
            href="/settings"
            className={` ${!isMe ? 'opacity-0 pointer-events-none ' : ''}`}
          >
            <Cog size={32} />
          </Link>
        }
      </section>

      <section className="avatar my-8 flex justify-center">
        <div className="size-48 rounded-full bg-gradient-to-bl from-igRed to-igOrange flex items-center justify-center">
          <Image
            src={profile.avatar || fallBack}
            alt="avatar"
            width={200}
            height={200}
            className="size-44 object-cover border-8 border-white rounded-full"
          />
        </div>
      </section>

      <section className="details text-[1.4rem] flex flex-col justify-center items-center gap-3">
        <div className="name font-semibold text-[1.5rem] text-center">
          {profile.name}
        </div>
        <div className="subtitle text-slate-500 text-center">
          {profile.subtitle}
        </div>
        <div className="bio font-light text-center">{profile.bio}</div>
      </section>
    </div>
  );
}
