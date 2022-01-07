import type { NextPage } from 'next';
import Head from 'next/head';

import CodeEditor from '../components/CodeEditor';
import { useAppSelector } from '../store';
import CodeBlock from '../components/CodeBlock';
import Card from '../components/Card';
import { selectPosts } from '../store/modules/feed';

const Home: NextPage = () => {
  const posts = useAppSelector(selectPosts);

  return (
    <div>
      <Head>
        <title>Daily Tricks</title>
        <meta name="description" content="Daily Tricks" />
      </Head>
      <main>
        <div className="max-w-screen-md mx-auto my-4">
          <CodeEditor />
          {
            posts.map((p) => (
              <Card key={p.id}>
                <CodeBlock key={p.id} language={p.language} className="mt-4">
                  { p.value }
                </CodeBlock>
              </Card>
            ))
          }
        </div>
      </main>
    </div>
  );
};

export default Home;
