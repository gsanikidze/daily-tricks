import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import ToolCard from '../components/ToolCard';
import Tabs from '../components/Tabs';
import { useGetToolCategoriesQuery } from '../store/modules/api';

export default function Tools() {
  const { data } = useGetToolCategoriesQuery();
  const [tabs, setTabs] = useState<{ title: string, key: string }[]>([]);

  useEffect(() => {
    if (data) {
      const newSt = [{ title: 'All', key: 'all' }];

      data.forEach((i) => {
        newSt.push({
          title: i.title,
          key: i.id,
        });
      });

      setTabs(newSt);
    }
  }, [data]);

  return (
    <div>
      <Head>
        <title>Tools | Daily Tricks</title>
        <meta name="description" content="Daily Tricks" />
      </Head>
      <main>
        <div className="mx-4 max-w-screen-md md:mx-auto my-4 space-y-4">
          <Tabs tabs={tabs} />
          <ToolCard />
        </div>
      </main>
    </div>
  );
}
