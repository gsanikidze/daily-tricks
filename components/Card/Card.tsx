import React from 'react';

interface Props {
  children: string | JSX.Element[] | JSX.Element;
  className?: string;
}

export default function Card({ children, className }: Props) {
  return (
    <div className={`bg-white rounded-lg shadow-md dark:bg-gray-800 ${className}`}>
      { children }
    </div>
  );
}

Card.defaultProps = {
  className: '',
};
