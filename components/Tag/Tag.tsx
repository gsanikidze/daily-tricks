import React from 'react';

interface Props {
  children: string;
}

export default function Tag({ children }: Props) {
  return (
    <div className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
      { children }
    </div>
  );
}
