import type { NextPage } from 'next';
import Head from 'next/head';

import CodeEditor from '../components/CodeEditor';
import CodeBlock from '../components/CodeBlock';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Header from '../components/Header';
import UserAvatar from '../components/UserAvatar';
import { useGetTricksQuery } from '../store/modules/api';

const Home: NextPage = () => {
  const { isLoading, data = [] } = useGetTricksQuery({});

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
            isLoading ? <Card className="mt-4" title="Loading..." /> : data.map((p) => (
              <Card
                key={p.id}
                className="mt-4 overflow-hidden"
                title={p.title}
                addonBefore={(
                  <div className="flex justify-between items-center">
                    <UserAvatar
                      name={p.user.displayName || ''}
                      alt={p.user.displayName || ''}
                      photoURL={p.user.photoURL}
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
