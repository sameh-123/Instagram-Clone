import { auth, signIn } from '@/auth';
import HomePosts from '@/components/HomePosts';
import StatusBar from '@/components/StatusBar';
import { prisma } from '@/db';
import logo from '/public/ig.png';
import google from '/public/google.png';
import Image from 'next/image';
import SettingsBar from '@/components/SettingsBar';
export default async function Home() {
  const session = await auth();
  if (!session) {
    return (
      <div className=" h-screen flex flex-col w-full">
        <SettingsBar />
        <div className="container mx-auto w-full flex items-center justify-center mt-10">
          <div className="rounded-lg shadow-md dark:shadow-gray-400 p-10 w-96 flex flex-col items-center gap-5">
            <div className="font-bold text-lg">Welcome to</div>
            <Image src={logo} alt="instagram" className="dark:invert w-full" />
            <p className="font-extralight text-2xl text-center">
              enjoy sharing moments with others
            </p>
            <form
              action={async () => {
                'use server';
                await signIn('google');
              }}
            >
              <button
                type="submit"
                className="bg-igOrange hover:bg-igRed font-semibold text-white px-4 py-2 rounded-2xl flex items-center gap-1"
              >
                sign in with google
                <Image src={google} alt="google" className="size-8" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  const myEmail = session?.user?.email as string;
  const myProfile = await prisma.profile.findFirst({
    where: {
      email: myEmail,
    },
  });
  const following = await prisma.follow.findMany({
    where: {
      follower: myEmail,
    },
  });
  const profiles = await prisma.profile.findMany({
    where: {
      email: { in: following.map((f) => f.user) },
    },
  });
  if (myProfile) profiles.unshift(myProfile);
  const posts = await prisma.post.findMany({
    where: {
      author: { in: profiles.map((f) => f.email) },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <div className="container mx-auto ">
      <SettingsBar />
      <StatusBar profiles={profiles} />
      <HomePosts posts={posts} Email={myEmail} />
    </div>
  );
}
