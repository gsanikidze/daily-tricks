import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import CodeEditor from '../components/CodeEditor';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { useAppSelector } from '../store';
import { useGetTricksQuery, useGetBookmarkIdsQuery } from '../store/modules/api';
import TrickCard from '../components/TrickCard';
import Spinner from '../components/Spinner';

interface Props {
  activePage: number;
  q: string;
}

const Home = ({ activePage, q }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const user = useAppSelector((st) => st.user);
  const router = useRouter();
  const take = 10;
  const bookmarks = useGetBookmarkIdsQuery(user.profile?.uid || '').data || [];
  const { isLoading, isFetching, data = { records: [], count: 0 } } = useGetTricksQuery({
    take,
    skip: (activePage - 1) * take,
    q,
  });
  const totalPages = Math.ceil(data.count / take);

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
            isFetching ? (
              <Card className="mt-4 p-4 flex justify-center"><Spinner /></Card>
            ) : data.records.map((p) => <TrickCard trick={p} bookmarks={bookmarks} />)
          }
          {
            !isLoading && totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  totalPages={totalPages}
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
    q: context.query.q ? String(context.query.q) : '',
  },
});

export default Home;
