import React, { useCallback, useState } from 'react';
import classnames from 'classnames';

interface Props {
  tabs: {
    title: string;
    key: string;
  }[];
  defaultActive?: string;
  onTabChange?: (key: string) => void;
}

export default function Tabs({ tabs, defaultActive, onTabChange }: Props) {
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultActive);

  const changeTab = useCallback((key: string) => {
    setActiveTab(key);

    if (onTabChange) {
      onTabChange(key);
    }
  }, [onTabChange]);

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700">
      {
        tabs.map((t, i) => (
          <button
            key={t.key}
            onClick={() => changeTab(t.key)}
            className={classnames(
              'h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none',
              {
                'text-blue-600 border-blue-500 dark:border-blue-400 dark:text-blue-300': activeTab === t.key || (!activeTab && i === 0),
                'text-gray-700 border-transparent dark:text-white focus:outline-none hover:border-gray-400': activeTab !== t.key || (!activeTab && i !== 0),
              },
            )}
          >
            { t.title }
          </button>
        ))
      }
    </div>
  );
}

Tabs.defaultProps = {
  defaultActive: null,
  onTabChange: null,
};
