import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz";
import getChiefs from "app/chiefs/queries/getChiefs";

const ITEMS_PER_PAGE = 100;

export const ChiefsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ chiefs, hasMore }] = usePaginatedQuery(getChiefs, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {chiefs.map((chief) => (
          <li key={chief.id}>
            <Link href={`/chiefs/${chief.id}`}>
              <a>{chief.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button type="button" disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button type="button" disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const ChiefsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/chiefs/new">
          <a>Create Chief</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ChiefsList />
      </Suspense>
    </div>
  );
};

ChiefsPage.getLayout = (page) => <Layout title="Chiefs">{page}</Layout>;

export default ChiefsPage;
