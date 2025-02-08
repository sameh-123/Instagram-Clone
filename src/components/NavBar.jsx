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
        <div className="w-2/5  bg-white border-t-igOrange border-r-0 border-l-igOrange border-2 dark:bg-slate-200 flex items-center justify-around rounded-t-xl absolute left-0 bottom-0 py-4">
          <Link
            href="/"
            className={`${active == 0 ? 'text-igRed' : ''} hover:text-igRed`}
          >
            <HomeIcon />
          </Link>
          <Link
            href="/search"
            className={`${active == 3 ? 'text-igRed' : ''} hover:text-igRed`}
          >
            <SearchIcon />
          </Link>
        </div>
        <div className="w-full bg-transparent absolute inset-x-0 flex items-center justify-center  sm:-top-12 top-[-3.47rem] -z-20 rounded-full">
          <div className="bg-clip-text  border-white dark:border-slate-200 dark:border-t-transparent dark:border-r-transparent border-[52px] border-t-transparent border-r-transparent sm:p-2 p-3 border-l-[53px] -rotate-45  absolute  rounded-full">
            <Link
              href="/create"
              className="rotate-45 bg-gradient-to-tr from-igRed to-igOrange rounded-full sm:size-[3.7rem] size-[3rem] flex items-center justify-center text-white hover:scale-125"
            >
              <CameraIcon />
            </Link>
          </div>
        </div>

        <div className="w-2/5 bg-white border-t-igOrange border-l-0 border-r-igOrange border-2 dark:bg-slate-200 flex items-center justify-around rounded-t-xl absolute right-0 bottom-0 py-4">
          <Link
            href="/browse"
            className={`${active == 2 ? 'text-igRed' : ''} hover:text-igRed`}
          >
            <LayoutGridIcon />
          </Link>
          <Link
            href="/profile"
            className={`${active == 1 ? 'text-igRed' : ''} hover:text-igRed`}
          >
            <UserIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
