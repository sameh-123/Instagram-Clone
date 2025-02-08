'use client';
import logo from '/public/ig.png';
import Image from 'next/image';
import {
  CameraIcon,
  HomeIcon,
  LayoutGridIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
export default function DeskTopNav() {
  const path = usePathname();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (path.includes('profile')) setActive(3);
    else if (path.includes('browse')) setActive(2);
    else if (path.includes('search')) setActive(1);
    else if (path.includes('create')) setActive(4);
    else setActive(0);
  }, [path]);
  return (
    <div className="shadow-lg shadow-gray-500 min-h-screen hidden lg:block">
      <div className="sticky top-0 w-48 lg:w-56 p-5">
        <Image src={logo} alt="instagram" className="dark:invert" />
        <div className="flex flex-col gap-8 p-4 *:flex *:items-center *:gap-2">
          <Link
            href="/"
            className={`${active == 0 ? 'text-igRed' : ''} hover:text-igRed`}
          >
            <HomeIcon />
            Home
          </Link>
          <Link
            href="/search"
            className={`${active == 1 ? 'text-igRed' : ''} hover:text-igRed`}
          >
            <SearchIcon />
            Search
          </Link>
          <Link
            href="/browse"
            className={`${active == 2 ? 'text-igRed' : ''} hover:text-igRed`}
          >
            <LayoutGridIcon />
            Browse
          </Link>
          <Link
            href="/profile"
            className={`${active == 3 ? 'text-igRed' : ''} hover:text-igRed`}
          >
            <UserIcon />
            Profile
          </Link>
          <Link
            href="/create"
            className={`${active == 4 ? 'text-igRed' : ''} hover:text-igRed`}
          >
            <CameraIcon />
            New Post
          </Link>
        </div>
      </div>
    </div>
  );
}
