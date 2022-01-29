import React from 'react';

interface Props {
  children: string;
  flat?: boolean;
}

export default function Tag({ children, flat }: Props) {
  if (flat) {
    return (
      <div className="text-xs text-blue-400">
        { children }
      </div>
    );
  }

  return (
    <div className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
      { children }
    </div>
  );
}

Tag.defaultProps = {
  flat: false,
};
