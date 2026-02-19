'use client';

import Image from 'next/image';

interface EventThumbnailProps {
  eventThumb?: string | null;
}

export const EventThumbnail = ({ eventThumb }: EventThumbnailProps) => {
  if (!eventThumb) return null;

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden bg-transparent">
      <Image
        src={eventThumb}
        alt="Event badge"
        fill
        className="object-contain"
        sizes="100vw"
      />
    </div>
  );
};
