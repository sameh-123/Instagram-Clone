import ProfilePageContent from '@/components/ProfilePageContent';
import { prisma } from '@/db';
type Params = Promise<{ id: string }>;
export default async function UserPage({ params }: { params: Params }) {
  const { id } = await params;
  const profile = await prisma.profile.findFirst({
    where: {
      id: id,
    },
  });
  if (!profile) return 'not found';
  return <ProfilePageContent profile={profile} />;
}
