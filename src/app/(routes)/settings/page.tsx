import SettingsForm from '@/components/SettingsForm';
import { auth } from '@/auth';
import { prisma } from '@/db';
import { signOut } from '@/auth';
import { Button } from '@radix-ui/themes';
export default async function Settings() {
  const session = await auth();
  if (!session?.user?.email) {
    return 'not log in';
  }
  const profile = await prisma.profile.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  return (
    <div className="mx-auto container max-w-2xl">
      <h1 className="text-2xl font-bold text-center my-8">Profile Settings</h1>
      <SettingsForm  profile={profile} />
      <form
      className='w-full flex justify-end'
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type="submit" className="bg-igRed text-white">
          log out
        </Button>
      </form>
    </div>
  );
}
