import { prisma } from '@/db';
import Image from 'next/image';
import fallBack from '/public/default-fallback-image.png';
import Link from 'next/link';
export default async function SearchResults({ query }: { query: string }) {
  const profiles = await prisma.profile.findMany({
    where: {
      OR: [{ username: { contains: query } }, { name: { contains: query } }],
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      description: { contains: query },
    },
  });
  return (
    <div className="">
      {query && (
        <div className="text-slate-600 dark:text-slate-300">
          results for &quot;{query}&quot;
        </div>
      )}

      <div className="my-4">
        {query && <div className="font-semibold my-5">Profiles:</div>}
        {profiles.length === 0 && query && <div>no profiles found !</div>}
        {query && (
          <div className="grid custom:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {profiles.map((profile) => (
              <Link
                href={`/user/${profile.id}`}
                key={profile.id}
                className="flex items-center gap-4"
              >
                <Image
                  src={profile?.avatar||fallBack}
                  alt={profile.username ||"user name"}
                  width={200}
                  height={200}
                  className="size-24 rounded-full object-cover"
                />
                <div>
                  <div>{profile.name}</div>
                  <div className="text-slate-600 dark:text-slate-300">
                    @{profile.username}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div>
        {query && <div className="font-semibold my-5">Posts:</div>}
        {posts.length === 0 && query && <div>no posts found !</div>}
        {query && (
          <div className="grid custom:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {posts.map(async (post) => {
              const authorEmail = post.author;
              const authorData = await prisma.profile.findFirst({
                where: {
                  email: authorEmail,
                },
              });
              return (
                <Link href={`/posts/${post.id}`} key={post.id}>
                  <div className="flex gap-2">
                    <Image
                      src={authorData?.avatar|| fallBack}
                      alt={authorData?.name || "name"}
                      width={200}
                      height={200}
                      className="size-16 rounded-full object-cover"
                    />
                    <div>
                      <div>{authorData?.name}</div>
                      <div>@{authorData?.username}</div>
                    </div>
                  </div>
                  <Image
                    src={post?.image || fallBack}
                    alt="post image"
                    width={200}
                    height={200}
                    className="w-full h-[400px] rounded-lg object-cover my-2"
                  />
                  <p className="line-clamp-1 w-full">{post.description}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
