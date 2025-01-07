import { getPostData } from '@/components/PostData';
import SinglePostComponent from '@/components/SinglePostComponent';
import ModalSinglePost from '@/components/ModalSinglePost';
type Params = Promise<{ id: string }>;
export default async function PostModal({ params }: { params: Params }) {
  const { id } = await params;
  const data = await getPostData(id);
  return (
    <div>
      <ModalSinglePost>
        <SinglePostComponent {...data} postId={id} />
      </ModalSinglePost>
    </div>
  );
}
