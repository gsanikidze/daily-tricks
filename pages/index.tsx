import type { NextPage } from 'next';
import Head from 'next/head';

import CodeEditor from '../components/CodeEditor';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Daily Tricks</title>
      <meta name="description" content="Daily Tricks" />
    </Head>

    <main>
      <div className="max-w-screen-md mx-auto my-4">
        <CodeEditor />
      </div>
    </main>
  </div>
);

export default Home;
