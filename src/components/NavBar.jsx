'use client';
import {
  CameraIcon,
  HomeIcon,
  LayoutGridIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function NavBar() {
  const path = usePathname();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (path.includes('profile')) setActive(1);
    else if (path.includes('browse')) setActive(2);
    else if (path.includes('search')) setActive(3);
    else if (path.includes('create')) setActive(4);
    else setActive(0);
  }, [path]);
  return (
    <div className=" fixed bottom-0 left-0 right-0 w-full lg:hidden">
      <div className="flex justifiy-center  text-gray-600 max-w-sm mx-auto relative">
        <div className="w-2/5  bg-white flex items-center justify-around rounded-t-xl absolute left-0 bottom-0 py-4">
          <Link href="/" className={`${active == 0 ? 'text-igRed' : ''}`}>
            <HomeIcon />
          </Link>
          <Link href="/search" className={`${active == 3 ? 'text-igRed' : ''}`}>
            <SearchIcon />
          </Link>
        </div>

        <div className="w-1/5 bg-transparent absolute left-[27.22%] -top-32 -z-20 rounded-full">
          <div className="bg-clip-text  border-white border-[50px] border-t-transparent border-r-transparent p-2 border-l-[50px] -rotate-45  absolute  rounded-full">
            <Link
              href="/create"
              className="rotate-45 bg-gradient-to-tr from-igRed to-igOrange rounded-full size-[3.7rem] flex items-center justify-center text-white"
            >
              <CameraIcon />
            </Link>
          </div>
        </div>

        <div className="w-2/5 bg-white flex items-center justify-around rounded-t-xl absolute right-0 bottom-0 py-4">
          <Link href="/browse" className={`${active == 2 ? 'text-igRed' : ''}`}>
            <LayoutGridIcon />
          </Link>
          <Link
            href="/profile"
            className={`${active == 1 ? 'text-igRed' : ''}`}
          >
            <UserIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
