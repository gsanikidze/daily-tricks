import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import CodeEditor from '../components/CodeEditor';
import CodeBlock from '../components/CodeBlock';
import Card from '../components/Card';
import Tag from '../components/Tag';
import UserAvatar from '../components/UserAvatar';
import { useGetTricksQuery } from '../store/modules/api';
import Pagination from '../components/Pagination';

interface Props {
  activePage: number;
}

const Home = ({ activePage }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const take = 10;
  const { isLoading, isFetching, data = { records: [], count: 0 } } = useGetTricksQuery({
    take,
    skip: (activePage - 1) * take,
  });

  const changePage = useCallback((nextPage: number) => {
    router.query.page = String(nextPage);
    router.push(router);
  }, [router]);

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
            isFetching ? <Card className="mt-4" title="Loading..." /> : data.records.map((p) => (
              <Card
                key={p.id}
                className="mt-4 overflow-hidden"
                title={p.title}
                addonBefore={(
                  <div className="flex justify-between items-center">
                    <UserAvatar
                      name={p.user.displayName || p.user.email || ''}
                      alt={p.user.displayName || p.user.email || ''}
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
          {
            !isLoading && (
              <div className="flex justify-center mt-8">
                <Pagination
                  totalPages={Math.ceil(data.count / take)}
                  onChange={changePage}
                  defaultActivePage={activePage}
                />
              </div>
            )
          }
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => ({
  props: {
    activePage: Number(context.query.page) || 1,
  },
});

export default Home;
