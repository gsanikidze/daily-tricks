import React from 'react';
import { X } from 'react-feather';
import Button from '../Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[] | string;
  title?: string;
}

export default function Modal({
  isOpen, onClose, title, children,
}: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50"
        onClick={onClose}
      />
      <Button
        className="fixed top-8 right-8 z-50"
        onClick={onClose}
        type="default"
      >
        <X color="white" />
      </Button>
      <div
        className="
          bg-white dark:bg-gray-800 max-w-screen-sm rounded-lg z-50
          fixed w-full left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2
        "
      >
        {
          title && <h3 className="p-4 border-b border-gray-200 dark:border-gray-700">{title}</h3>
        }
        <div>
          { children }
        </div>
      </div>
    </>
  );
}

Modal.defaultProps = {
  title: null,
};
