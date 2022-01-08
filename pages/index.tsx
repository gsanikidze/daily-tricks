import type { NextPage } from 'next';
import Head from 'next/head';

import CodeEditor from '../components/CodeEditor';
import { useAppSelector } from '../store';
import CodeBlock from '../components/CodeBlock';
import Card from '../components/Card';
import { selectPosts } from '../store/modules/feed';
import Tag from '../components/Tag';
import Header from '../components/Header';
import UserAvatar from '../components/UserAvatar';

const Home: NextPage = () => {
  const posts = useAppSelector(selectPosts);

  return (
    <div>
      <Head>
        <title>Daily Tricks</title>
        <meta name="description" content="Daily Tricks" />
      </Head>
      <Header />
      <main>
        <div className="max-w-screen-md mx-auto my-4">
          <CodeEditor />
          {
            posts.map((p) => (
              <Card
                key={p.id}
                className="mt-4 overflow-hidden"
                title={p.title}
                addonBefore={(
                  <div className="flex justify-between items-center">
                    <UserAvatar
                      name={p.author.displayName || ''}
                      alt={p.author.displayName || ''}
                      photoURL={p.author.photoURL}
                    />
                    <div className="flex items-center space-x-4">
                      <code className="text-sm">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </code>
                      <Tag>
                        {p.language}
                      </Tag>
                    </div>
                  </div>
                )}
              >

                <CodeBlock key={p.id} language={p.language}>
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
