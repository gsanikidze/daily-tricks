import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import ToolCard from '../components/ToolCard';
import Tabs from '../components/Tabs';
import { useGetToolCategoriesQuery, useGetToolsQuery } from '../store/modules/api';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import Card from '../components/Card';

const Tools = ({ activePage, q }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const categories = useGetToolCategoriesQuery();
  const [tabs, setTabs] = useState<Record<string, { title: string, key: string }>>({});
  const take = 10;
  const { isLoading, isFetching, data = { records: [], count: 0 } } = useGetToolsQuery({
    take,
    skip: (activePage - 1) * take,
    q,
  });
  const totalPages = Math.ceil(data.count / take);

  const changePage = useCallback((nextPage: number) => {
    router.query.page = String(nextPage);
    router.push(router);
  }, [router]);

  useEffect(() => {
    if (categories.data) {
      const newSt: Record<string, { title: string, key: string }> = {};

      newSt.all = { title: 'All', key: 'all' };

      categories.data.forEach((i) => {
        newSt[i.id] = {
          title: i.title,
          key: i.id,
        };
      });

      setTabs(newSt);
    }
  }, [categories.data]);

  return (
    <div>
      <Head>
        <title>Tools | Daily Tricks</title>
        <meta name="description" content="Daily Tricks" />
      </Head>
      <main>
        <div className="mx-4 max-w-screen-md md:mx-auto my-4 space-y-4">
          <Tabs tabs={Object.values(tabs)} />
          {
            isFetching ? (
              <Card className="mt-4 p-4 flex justify-center"><Spinner /></Card>
            ) : data.records.map((i) => (
              <ToolCard
                key={i.id}
                name={i.name}
                description={i.description}
                imageSrc={i.imageSrc}
                homepageUrl={i.homepageUrl}
                categories={i.categoryIds.map((c) => tabs[c].title)}
                tags={i.tags}
              />
            ))
          }
        </div>
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
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    activePage: Number(context.query.page) || 1,
    q: context.query.q ? String(context.query.q) : '',
  },
});

export default Tools;
