import React from 'react';
import { GitHub, LogOut } from 'react-feather';
import Link from 'next/link';

import Button from '../Button';
import useAuth from '../../hooks/useAuth';
import { useAppSelector } from '../../store';
import UserAvatar from '../UserAvatar';
import SearchBox from '../SearchBox';
import Navigation from '../Navigation';

export default function Header() {
  const { isAuthorized, authWithGithub, logOut } = useAuth();
  const profile = useAppSelector((st) => st.user.profile);

  return (
    <header
      className="bg-white shadow dark:bg-gray-800 py-2 pb-4 md:py-4 px-4"
    >
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <div className="flex space-x-2 md:space-x-4">
          <Link passHref href="/">
            <a>
              <h5 className="flex items-center">
                Daily Tricks
              </h5>
            </a>
          </Link>
          <div className="hidden lg:inline-block">
            <Navigation
              navItems={[
                { href: '/', text: 'Feed' },
                { href: '/bookmarks', text: 'Bookmarks' },
                { href: '/tools', text: 'Tools' },
              ]}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden lg:inline-block">
            <SearchBox />
          </span>
          {
          isAuthorized ? (
            <div className="flex items-center space-x-4">
              <UserAvatar
                photoURL={profile.photoURL}
                alt={profile.displayName || profile.email || 'avatar'}
                name={profile.displayName || profile.email || ''}
              />
              <Button type="default" onClick={logOut}>
                <LogOut size={16} />
              </Button>
            </div>
          ) : (
            <Button
              type="default"
              beforeAddon={<GitHub size={16} />}
              onClick={authWithGithub}
            >
              GitHub Auth
            </Button>
          )
        }
        </div>
      </div>
      <div className="border-t pt-4 mt-2 md:mt-4 flex justify-between border-gray-200 dark:border-gray-700 lg:hidden items-center">
        <Navigation
          navItems={[
            { href: '/', text: 'Feed' },
            { href: '/bookmarks', text: 'Bookmarks' },
          ]}
        />
        <div className="absolute right-4">
          <SearchBox />
        </div>
      </div>
    </header>
  );
}
