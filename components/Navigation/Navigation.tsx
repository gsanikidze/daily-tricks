import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

interface Props {
  navItems: {
    href: string;
    text: string;
  }[];
}

export default function Navigation({ navItems }: Props) {
  const router = useRouter();

  const getClassName = (isActive: boolean): string => classNames(
    'px-2 py-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100',
    {
      'dark:bg-gray-700 bg-gray-200': isActive,
    },
  );

  return (
    <div className="flex space-x-2">
      {
        navItems.map((navItem) => (
          <Link
            key={navItem.href}
            href={navItem.href}
            passHref
          >
            <a className={getClassName(router.pathname === navItem.href)}>
              { navItem.text }
            </a>
          </Link>
        ))
      }
    </div>
  );
}
