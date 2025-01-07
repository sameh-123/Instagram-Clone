'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <div
    className='cursor-pointer'
      onClick={() => {
        router.back();
        router.refresh();
      }}
    >
      <ChevronLeft size={32} />
    </div>
  );
}
