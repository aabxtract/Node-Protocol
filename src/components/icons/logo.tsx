'use client';

import Image from 'next/image';

export default function Logo({className}: {className?: string}) {
  return (
    <Image
      src="/nodeprotocol.png"
      alt="Node Protocol Logo"
      width={32}
      height={32}
      className={className}
    />
  );
}
