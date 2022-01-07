import React from 'react';
import { GitHub, LogOut } from 'react-feather';
import Image from 'next/image';

import Button from '../Button';
import useAuth from '../../hooks/useAuth';
import { useAppSelector } from '../../store';

export default function Header() {
  const { isAuthorized, authWithGithub, logOut } = useAuth();
  const profile = useAppSelector((st) => st.user.profile);

  return (
    <header
      className="bg-white shadow dark:bg-gray-800 py-4"
    >
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <h5>
          Daily Tricks
        </h5>
        {
          isAuthorized ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {
                  profile.photoURL && (
                    <div className="relative mr-4 w-10 h-10">
                      <Image
                        className="rounded-full"
                        src={profile.photoURL}
                        alt={profile.displayName || profile.email || 'avatar'}
                        width={40}
                        height={40}
                      />
                    </div>
                  )
                }
                <span className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                  {profile.displayName || profile.email}
                </span>
              </div>
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
    </header>
  );
}
