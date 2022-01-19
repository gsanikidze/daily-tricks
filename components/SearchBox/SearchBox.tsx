import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Search, X } from 'react-feather';
import Button from '../Button';
import Input from '../Input';

export default function SearchBox() {
  const router = useRouter();
  const [updateQueryTimeout, setUpdateQueryTimeout] = useState<any>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const onSearch = useCallback((value: string) => {
    clearTimeout(updateQueryTimeout);

    setUpdateQueryTimeout(setTimeout(() => {
      router.query.q = value;
      delete router.query.page;
      router.push(router);
    }, 500));
  }, [router, updateQueryTimeout]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((st) => !st);
  }, []);

  useEffect(() => () => {
    clearTimeout(updateQueryTimeout);
  });

  return (
    <div className="flex space-x-4">
      {
        isSearchOpen && (
          <div>
            <Input
              placeholder="Search"
              onChange={onSearch}
              defaultValue={router.query.q as string}
            />
          </div>
        )
      }
      <Button onClick={toggleSearch}>
        { isSearchOpen ? <X /> : <Search /> }
      </Button>
    </div>
  );
}
