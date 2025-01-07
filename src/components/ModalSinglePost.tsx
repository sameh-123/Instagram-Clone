'use client';
import { Dialog, Button } from '@radix-ui/themes';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
export default function ModalSinglePost({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpne] = useState(true);
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => {
        setIsOpne((prev) => !prev);
        router.back();
        router.refresh();
      }}
    >
      <Dialog.Title hidden>post info</Dialog.Title>
      <Dialog.Description size="2" mb="4" hidden>
        here is the info of the clicked post
      </Dialog.Description>
      <Dialog.Content
        maxWidth=""
        maxHeight=""
        className="overflow-y-scroll max-h-screen rounded-lg"
      >
        <div className="w-full flex justify-end items-center sticky top-0">
          <Dialog.Close>
            <Button variant="solid" color="red">
              <X />
            </Button>
          </Dialog.Close>
        </div>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
}
