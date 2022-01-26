import React from 'react';
import Image from 'next/image';

interface Props {
  photoURL?: string | null;
  alt: string;
  name: string;
}

export default function UserAvatar({ photoURL, name, alt }: Props) {
  return (
    <div className="flex items-center">
      {
        photoURL && (
          <div className="relative mr-2 md:mr-4 w-8 h-8">
            <Image
              className="rounded-full"
              src={photoURL}
              alt={alt}
              width={32}
              height={32}
            />
          </div>
        )
      }
      <span className="font-bold text-sm text-gray-700 cursor-pointer dark:text-gray-200">
        <span className="hidden md:inline-block">
          { name }
        </span>
        <span className="md:hidden">
          { `${name.split(' ').map((i) => i[0]).join('.')}.` }
        </span>
      </span>
    </div>
  );
}

UserAvatar.defaultProps = {
  photoURL: null,
};
