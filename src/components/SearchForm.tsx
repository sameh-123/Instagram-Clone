'use client';
import { TextField } from '@radix-ui/themes';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function SearchForm() {
  const router = useRouter();
  return (
    <form
      action={async (data: FormData) => {
        router.push('/search?query=' + data.get('query'));
        router.refresh();
      }}
      className="my-10 flex justify-center w-full"
    >
      <TextField.Root
        name="query"
        placeholder="search for post or user..."
        className="max-w-lg w-full"
      >
        <TextField.Slot>
          <Search />
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
}
