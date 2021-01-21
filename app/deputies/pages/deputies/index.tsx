import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz";
import getDeputies from "app/deputies/queries/getDeputies";

const ITEMS_PER_PAGE = 100;

export const DeputiesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ deputies, hasMore }] = usePaginatedQuery(getDeputies, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {deputies.map((deputy) => (
          <li key={deputy.id}>
            <Link href={`/deputies/${deputy.id}`}>
              <a>{deputy.name}</a>
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

const DeputiesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/deputies/new">
          <a>Create Deputy</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <DeputiesList />
      </Suspense>
    </div>
  );
};

DeputiesPage.getLayout = (page) => <Layout title="Deputies">{page}</Layout>;

export default DeputiesPage;
