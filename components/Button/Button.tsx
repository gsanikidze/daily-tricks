import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

interface Props {
  children: string;
  type?: 'primary' | 'secondary';
  size?: 'default' | 'sm';
}

export default function Button({ children, type, size }: Props) {
  const [classes, setClasses] = useState<string>();

  useEffect(() => {
    setClasses(classnames(
      'font-medium tracking-wide text-white capitalize transition-colors duration-200 transform focus:outline-none focus:ring focus:ring-opacity-80',
      {
        'bg-blue-600 hover:bg-blue-500 focus:ring-blue-300': type === 'primary',
        'bg-pink-600 hover:bg-pink-500 focus:ring-pink-300': type === 'secondary',
        'px-4 py-2 rounded-md': size === 'default',
        'px-2 py-1 text-sm rounded': size === 'sm',
      },
    ));
  }, [type, size]);

  return (
    <button className={classes}>
      { children }
    </button>
  );
}

Button.defaultProps = {
  type: 'primary',
  size: 'default',
};
