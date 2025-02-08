'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import { CloudUploadIcon } from 'lucide-react';
import { profile } from '@prisma/client';
import { updateProfile } from '@/actions';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import fallBack from '/public/default-fallback-image.png';

export default function SettingsForm({ profile }: { profile: profile | null }) {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || null);
  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.set('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((url) => setAvatarUrl(url));
      });
    }
  }, [file]);
  return (
    <form
      action={async (data: FormData) => {
        await updateProfile(data);
        router.push('/profile');
        router.refresh();
      }}
    >
      <input type="hidden" name="avatar" value={avatarUrl || ''} />
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-gray-500 size-32 rounded-full">
          <Image
            src={avatarUrl || fallBack}
            alt="avatar"
            width={200}
            height={200}
            className="w-full h-full object-cover rounded-full shadow-lg shadow-gray-400"
          />
        </div>
        <div>
          <input
            readOnly
            type="file"
            className="hidden"
            ref={ref}
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
            }}
          />
          <Button
            variant="surface"
            type="button"
            onClick={() => {
              ref.current?.click();
            }}
          >
            <CloudUploadIcon />
            Change avatar
          </Button>
        </div>
      </div>
      <p className="font-semibold mt-2">user name:</p>
      <TextField.Root
        required
        placeholder="your_username"
        name="username"
        defaultValue={profile?.username || ''}
      />
      <p className="font-semibold mt-2">name:</p>
      <TextField.Root
        required
        placeholder="Sameh Reiad"
        name="name"
        defaultValue={profile?.name || ''}
      />
      <p className="font-semibold mt-2">subtitle:</p>
      <TextField.Root
        placeholder="Frontend Developer"
        name="subtitle"
        defaultValue={profile?.subtitle || ''}
      />
      <p className="font-semibold mt-2">bio:</p>
      <TextArea
        placeholder="I live in Egypt"
        name="bio"
        defaultValue={profile?.bio || ''}
      />
      <div className="mt-4 flex justify-center">
        <Button variant="solid">save settings</Button>
      </div>
    </form>
  );
}
