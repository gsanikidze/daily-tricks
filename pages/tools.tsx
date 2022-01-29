import React from 'react';
import Head from 'next/head';

import ToolCard from '../components/ToolCard';

export default function tools() {
  return (
    <div>
      <Head>
        <title>Tools | Daily Tricks</title>
        <meta name="description" content="Daily Tricks" />
      </Head>
      <main>
        <div className="mx-4 max-w-screen-md md:mx-auto my-4">
          <ToolCard />
        </div>
      </main>
    </div>
  );
}
