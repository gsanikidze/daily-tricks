import React from 'react';
import { GitHub } from 'react-feather';

import Button from '../Button';
import useAuth from '../../hooks/useAuth';

export default function Header() {
  const { isAuthorized, authWithGithub, logOut } = useAuth();

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
            <Button type="default" onClick={logOut}>
              Log Out
            </Button>
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
