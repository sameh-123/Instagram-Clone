import { prisma } from "@/db"
import Image from "next/image"
import Link from "next/link"

export default async function BrowsePage() {
    const posts = await prisma.post.findMany({
        orderBy: {createdAt:"desc"},
        take: 100
    })
  return (
    <div className="container mx-auto my-10">
        <div className="text-2xl font-semibold text-igRed">Browse</div>
        <div className="my-5 text-slate-500">check trending post and find inspiration</div>
        <div className="md:columns-3 columns-2 gap-5">
            {
                posts.map((post)=>(
                    <Link key={post.id} href={`/posts/${post.id}`}>
                        <Image src={post.image} alt={post.author} width={200} height={200} className="mb-5"/>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}
