'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sendPost } from '@/actions';
import { TextArea, Button } from '@radix-ui/themes';
import { UploadCloudIcon, Send, Pen, LoaderCircle } from 'lucide-react';
import Image from 'next/image';
export default function CreatePost() {
  const [imgUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (file) {
      setLoading(true);
      const data = new FormData();
      data.set('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((url) => setImageUrl(url));
        setLoading(false);
      });
    }
  }, [file]);
  return (
    <div className="container mx-auto">
      <input
        type="file"
        ref={ref}
        className="hidden"
        onChange={(e) => {
          setFile(e?.target?.files?.[0] || null);
        }}
      />
      <div className="flex flex-col items-center justify-center gap-10 md:my-5 my-5">
        {imgUrl ? (
          <div className="rounded-md sm:size-96 size-80 md:w-[40rem] md:h-[30rem] relative flex items-center justify-center">
            <Image
              src={imgUrl}
              alt="post"
              width={200}
              height={200}
              className="h-full w-full object-cover rounded-md"
            />
            <Button
              variant="solid"
              className="absolute bottom-3 bg-gradient-to-tr from-igRed to-igOrange hover:from-igOrange hover:to-igRed"
              onClick={() => ref.current?.click()}
            >
              <Pen />
              change image
            </Button>
          </div>
        ) : (
          <div className="sm:size-96 size-80 md:w-[40rem] md:h-[30rem] bg-gradient-to-br from-slate-400 to-igOrange rounded-md flex items-center justify-center">
            <Button
              variant="solid"
              className="bg-gradient-to-tr from-igRed to-igOrange hover:from-igOrange hover:to-igRed"
              onClick={() => ref.current?.click()}
            >
              {loading ? (
                <div>
                  <LoaderCircle className="animate-spin" />
                </div>
              ) : (
                <div className='flex items-center gap-1'>
                  <UploadCloudIcon />
                  choose image
                </div>
              )}
            </Button>
          </div>
        )}
        <form
          action={async (data: FormData) => {
            const id = await sendPost(data);
            // redirect('/profile');
            router.push(`/posts/${id}`);
            router.refresh();
          }}
          className="sm:w-96 w-80 md:w-[40rem] flex flex-col gap-5"
        >
          <input
            type="text"
            value={imgUrl}
            className="hidden"
            name="image"
            readOnly
          />
          <TextArea
            placeholder="image description..."
            className="w-full h-32"
            name="description"
          />
          <Button
            disabled={imgUrl == ''}
            variant="solid"
            className="w-full py-6 bottom-3 bg-gradient-to-tr from-igRed to-igOrange hover:from-igOrange hover:to-igRed"
          >
            <Send /> Post
          </Button>
        </form>
      </div>
    </div>
  );
}
