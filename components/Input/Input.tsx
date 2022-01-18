import React from 'react';

interface Props {
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

export default function Input({ placeholder, onChange, defaultValue }: Props) {
  const onInputChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <input
      defaultValue={defaultValue}
      onInput={onInputChange}
      placeholder={placeholder}
      id="username"
      type="text"
      className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
    />
  );
}

Input.defaultProps = {
  placeholder: null,
  onChange: null,
  defaultValue: null,
};
