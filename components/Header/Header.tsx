import React from 'react';
import { GitHub } from 'react-feather';
import Button from '../Button';

export default function Header() {
  return (
    <header
      className="bg-white shadow dark:bg-gray-800 py-4"
    >
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <h5>
          Daily Tricks
        </h5>
        <Button type="default" beforeAddon={<GitHub size={16} />}>
          Login With Github
        </Button>
      </div>
    </header>
  );
}
