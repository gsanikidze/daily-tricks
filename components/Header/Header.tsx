import React from 'react';
import { GitHub, LogOut } from 'react-feather';

import Button from '../Button';
import useAuth from '../../hooks/useAuth';
import { useAppSelector } from '../../store';
import UserAvatar from '../UserAvatar';
import SearchBox from '../SearchBox';
// import Navigation from '../Navigation';

export default function Header() {
  const { isAuthorized, authWithGithub, logOut } = useAuth();
  const profile = useAppSelector((st) => st.user.profile);

  return (
    <header
      className="bg-white shadow dark:bg-gray-800 py-4"
    >
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <div className="flex space-x-4">
          <h5>
            Daily Tricks
          </h5>
          {/* <Navigation
            navItems={[
              { href: '/', text: 'Feed' },
              { href: '/bookmarks', text: 'Bookmarks' },
            ]}
          /> */}
        </div>
        <div className="flex items-center space-x-4">
          <SearchBox />
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
              Login With GitHub
            </Button>
          )
        }
        </div>
      </div>
    </header>
  );
}
