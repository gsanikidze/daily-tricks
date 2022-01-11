import React from 'react';
import { Check, X } from 'react-feather';

export interface AlertProps {
  type: 'error' | 'success';
  title: string;
  text?: string
}

export default function Alert({ type, title, text }: AlertProps) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className={`flex items-center justify-center w-12 ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
        { type === 'success' ? <Check color="white" /> : <X color="white" /> }
      </div>
      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span className={`font-semibold ${type === 'success' ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>{title}</span>
          {
            text && (
              <p className="text-sm text-gray-600 dark:text-gray-200">
                {text.length >= 80 ? `${text.slice(0, 80)}...` : text}
              </p>
            )
          }
        </div>
      </div>
    </div>
  );
}

Alert.defaultProps = {
  text: null,
};
