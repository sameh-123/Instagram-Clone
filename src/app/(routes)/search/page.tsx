import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import { LoaderCircle } from 'lucide-react';
import { Suspense } from 'react';
type Params = Promise<{ query: string }>;
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const { query } = await searchParams;
  return (
    <div className="container mx-auto mb-20">
      <SearchForm />
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <LoaderCircle size={36} className="animate-spin text-igRed" />
          </div>
        }
      >
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
