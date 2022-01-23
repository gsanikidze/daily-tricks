import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { useGetBookmarkedTricksQuery } from '../store/modules/api';
import TrickCard from '../components/TrickCard';
import Spinner from '../components/Spinner';

interface Props {
  activePage: number;
  q: string;
}

const Bookmarks = ({ activePage, q }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const take = 10;
  const { isLoading, isFetching, data = { records: [], count: 0 } } = useGetBookmarkedTricksQuery({
    take,
    skip: (activePage - 1) * take,
    q,
  });
  const totalPages = Math.ceil(data.count / take);
  const trickIds = data.records.map((i) => i.id);

  const changePage = useCallback((nextPage: number) => {
    router.query.page = String(nextPage);
    router.push(router);
  }, [router]);

  return (
    <div>
      <Head>
        <title>Bookmarks | Daily Tricks</title>
      </Head>
      <main>
        <div className="max-w-screen-md mx-auto my-4">
          {
            isFetching ? (
              <Card className="mt-4 p-4 flex justify-center"><Spinner /></Card>
            ) : data.records.map((p) => <TrickCard trick={p} bookmarks={trickIds} />)
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

export default Bookmarks;
