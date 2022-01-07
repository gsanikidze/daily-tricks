import React from 'react';

interface Props {
  children: string | JSX.Element[] | JSX.Element;
  className?: string;
  addonBefore?: string | JSX.Element[] | JSX.Element;
  title?: string;
}

export default function Card({
  children, className, addonBefore, title,
}: Props) {
  return (
    <div className={`bg-white rounded-lg shadow-md dark:bg-gray-800 ${className}`}>
      { addonBefore && <div className="px-4 py-2">{addonBefore}</div> }
      { title && <h5 className="px-4 py-2 border-t border-gray-300 dark:border-gray-700">{title}</h5> }
      { children }
    </div>
  );
}

Card.defaultProps = {
  className: '',
  addonBefore: null,
  title: null,
};
