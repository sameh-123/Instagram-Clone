'use client';
import { profile } from '@prisma/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import fallBack from '/public/default-fallback-image.png';

export default function StatusBar({ profiles }: { profiles: profile[] }) {
  return (
    <div className="my-5 container mx-auto">
      <Carousel
        opts={{

          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem className="basis-auto">
            <div className="md:size-36 size-28 rounded-full flex flex-col gap-1 items-center justify-center bg-gradient-to-tr from-igRed to-igOrange text-white">
              <div className="text-[2rem]">+</div>
              <div className="md:text-[1.2rem] font-light">new status</div>
            </div>
          </CarouselItem>
          {profiles.map((profile) => (
            <CarouselItem key={profile.id} className="basis-auto">
              <div className="md:size-36 size-28 rounded-full flex items-center justify-center bg-gradient-to-tr from-igRed to-igOrange">
                <Image
                  src={profile?.avatar || fallBack}
                  alt={profile?.username || ''}
                  width={200}
                  height={200}
                  className="w-full aspect-square rounded-full object-cover border-4 border-white"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
