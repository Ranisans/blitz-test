import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz";
import getMainObjects from "app/objects/queries/getMainObjects";

const ITEMS_PER_PAGE = 100;

export const MainObjectsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ mainObjects, hasMore }] = usePaginatedQuery(getMainObjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {mainObjects.map((mainObject) => (
          <li key={mainObject.id}>
            <Link href={`/objects/${mainObject.id}`}>
              <a>{mainObject.title}</a>
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

const MainObjectsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/objects/new">
          <a>Create MainObject</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <MainObjectsList />
      </Suspense>
    </div>
  );
};

MainObjectsPage.getLayout = (page) => <Layout title="MainObjects">{page}</Layout>;

export default MainObjectsPage;
