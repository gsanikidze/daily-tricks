import Image from 'next/image';
import React from 'react';

interface Props {
  children?: string | JSX.Element[] | JSX.Element | any;
  className?: string;
  addonBefore?: string | JSX.Element[] | JSX.Element;
  addonAfterTitle?: string | JSX.Element[] | JSX.Element;
  title?: string;
  avatar?: IImage;
}

export default function Card({
  children, className, addonBefore, title, avatar, addonAfterTitle,
}: Props) {
  return (
    <div className={`bg-white rounded-lg shadow-md dark:bg-gray-800 ${className}`}>
      { addonBefore && <div className="px-4 py-2">{addonBefore}</div> }
      { addonBefore && title && <div className="border-t border-gray-300 dark:border-gray-700" /> }
      { title && (
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4">
            { avatar && (
            <div className="w-12 h-12 bg-white flex justify-center items-center rounded-full overflow-hidden">
              <Image src={avatar.src} alt={avatar.alt} width={40} height={40} />
            </div>
            )}
            <h5>{title}</h5>
          </div>
          {
            addonAfterTitle && addonAfterTitle
          }
        </div>
      ) }
      { children }
    </div>
  );
}

Card.defaultProps = {
  className: '',
  addonBefore: null,
  title: null,
  children: null,
  avatar: null,
  addonAfterTitle: null,
};
