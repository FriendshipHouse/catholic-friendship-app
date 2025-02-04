'use client';

import Image, { StaticImageData } from 'next/image';

type MemberCardType = {
  avatarSrc: StaticImageData;
  position: string;
  name: string;
};

function MemberCard({ avatarSrc, position, name }: Readonly<MemberCardType>) {
  return (
    <div className="flex flex-col justify-center gap-4 rounded-md border border-gray-40 bg-white p-4 shadow-4xl">
      <div className="mx-auto h-auto w-auto">
        <Image
          src={avatarSrc}
          alt="avarImage"
          className="h-full w-full rounded-md"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-2 text-center text-[16px]">
        <div>{position}</div>
        <div>{name}</div>
      </div>
    </div>
  );
}

export default MemberCard;
