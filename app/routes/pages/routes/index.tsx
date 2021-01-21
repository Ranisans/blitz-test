import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz";
import getRoutes from "app/routes/queries/getRoutes";

const ITEMS_PER_PAGE = 100;

export const RoutesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ routes, hasMore }] = usePaginatedQuery(getRoutes, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {routes.map((route) => (
          <li key={route.id}>
            <Link href={`/routes/${route.id}`}>
              <a>{route.name}</a>
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

const RoutesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/routes/new">
          <a>Create Route</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <RoutesList />
      </Suspense>
    </div>
  );
};

RoutesPage.getLayout = (page) => <Layout title="Routes">{page}</Layout>;

export default RoutesPage;
