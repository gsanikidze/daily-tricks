import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import classNames from 'classnames';

interface Props {
  totalPages: number;
  defaultActivePage?: number;
  onChange?: (page: number) => void;
}

export default function Pagination({
  totalPages,
  defaultActivePage = 1,
  onChange,
}: Props) {
  const shownPages = 5;
  const [activePage, setActivePage] = useState<number>(defaultActivePage);
  const [pages, setPages] = useState<JSX.Element[]>([]);
  const changePage = (isNext: boolean) => {
    const nextPage = isNext ? activePage + 1 : activePage - 1;

    if (nextPage > 0 && nextPage <= totalPages) {
      setActivePage(nextPage);
      if (onChange) {
        onChange(nextPage);
      }
    }
  };

  useEffect(() => {
    setActivePage(defaultActivePage);
  }, [defaultActivePage]);

  const renderPage = useCallback((page: number) => (
    <button
      key={`pagination-${page}`}
      className={classNames(
        `
              hidden px-4 py-2 mx-1 transition-colors duration-200 transform rounded-md select-none
              sm:inline
            hover:bg-blue-500 dark:hover:bg-blue-500
            hover:text-white dark:hover:text-gray-200`,
        {
          'text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200': page !== activePage,
          'text-gray-700 bg-gray-100 dark:bg-gray-500 dark:text-gray-200': page === activePage,
        },
      )}
      onClick={() => {
        if (onChange) {
          onChange(page);
        }

        setActivePage(page);
      }}
    >
      {page}
    </button>
  ), [activePage, onChange]);

  const renderArrow = (direction: 'left' | 'right', isDisabled: boolean) => (
    <button
      onClick={() => changePage(direction === 'right')}
      className={classNames(
        `
          flex items-center justify-center px-4 py-2 mx-1 capitalize transition-colors duration-200 transform rounded-md
        `,
        {
          'text-gray-500 cursor-not-allowed bg-white dark:bg-gray-700 dark:text-gray-600': isDisabled,
          'text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 cursor-pointer': !isDisabled,
        },
      )}
    >
      {
        direction === 'left' ? <ChevronLeft /> : <ChevronRight />
      }
    </button>
  );

  const dots = useMemo(() => (
    <span className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
      ...
    </span>
  ), []);

  useEffect(() => {
    const p: JSX.Element[] = [];
    const middlePage = Math.floor(shownPages / 2);

    p.push(renderPage(1));

    for (let index = 0; index < totalPages; index += 1) {
      if (index > 1 && index < totalPages) {
        if (activePage >= shownPages && index === 2) {
          p.push(dots);
        }

        let to = activePage + middlePage;
        let from = activePage - middlePage;

        if (from <= 0) {
          from = 1;
          to = shownPages;
        } else if (to >= totalPages) {
          from = totalPages - shownPages + 1;
          to = totalPages;
        }

        if (index >= from && index <= to) {
          p.push(renderPage(index));
        }

        if (totalPages - activePage > shownPages && index + 1 === totalPages) {
          p.push(dots);
        }
      }
    }

    p.push(renderPage(totalPages));
    setPages(p);
  }, [activePage, dots, renderPage, totalPages]);

  return (
    <div className="flex">
      {
        renderArrow('left', activePage === 1)
      }
      {
        pages
      }
      {
        renderArrow('right', activePage === totalPages)
      }
    </div>
  );
}

Pagination.defaultProps = {
  defaultActivePage: 1,
  onChange: null,
};
