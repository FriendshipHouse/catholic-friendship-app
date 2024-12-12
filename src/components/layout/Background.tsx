'use client';

import Image from 'next/image';

import backgroundImage from '@/../public/general/background-index.png';

function Background() {
  return (
    <div className="fixed z-0 hidden h-full w-full items-center justify-center md:flex">
      <Image
        src={backgroundImage}
        alt="backgroundImage"
        priority
        className="!max-w-none md:min-h-screen lg:w-full"
      />
    </div>
  );
}

export default Background;