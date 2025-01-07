import { getPostData } from '@/components/PostData';
import SinglePostComponent from '@/components/SinglePostComponent';
type Params = Promise<{ id: string }>;
export default async function SinglePost({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getPostData(id);
  return <SinglePostComponent {...data} postId={id} />;
}
