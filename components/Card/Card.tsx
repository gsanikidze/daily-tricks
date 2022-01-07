import React from 'react';

interface Props {
  children: string | JSX.Element[] | JSX.Element;
}

export default function Card({ children }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md dark:bg-gray-800">
      { children }
    </div>
  );
}
