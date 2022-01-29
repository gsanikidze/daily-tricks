import React from 'react';
import Head from 'next/head';

import ToolCard from '../components/ToolCard';
import Tabs from '../components/Tabs';

export default function tools() {
  const tabs = [
    { title: 'All', key: 'all' },
    { title: 'Editors', key: 'editors' },
  ];

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
