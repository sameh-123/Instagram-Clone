'use client';
import { Button } from '@radix-ui/themes';
import { UserCheck, UserPlusIcon } from 'lucide-react';
import { addFollow, removeFollow } from '@/actions';
import { useState } from 'react';
import { Follow } from '@prisma/client';
export default function FollowButton({
  email,
  followSession,
}: {
  email: string;
  followSession: Follow | null;
}) {
  const [isFollow, setIsFollow] = useState(!!followSession);
  console.log(isFollow);
  return (
    <form
      action={async (data: FormData) => {
        setIsFollow((prev) => !prev);
        if (isFollow) {
          removeFollow(data);
        } else addFollow(data);
      }}
    >
      <input type="hidden" value={email} readOnly name="email" />
      <Button
        type="submit"
        variant="solid"
        className={`${
          !isFollow
            ? 'bg-gradient-to-tr from-igOrange to-igRed to-[80%]'
            : 'bg-slate-600'
        } text-[1.2rem] cursor-pointer`}
      >
        {!isFollow ? <UserPlusIcon /> : <UserCheck />}
        {!isFollow ? 'Follow' : 'Following'}
      </Button>
    </form>
  );
}
