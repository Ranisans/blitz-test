import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, usePaginatedQuery, BlitzPage } from "blitz";
import getMainObjects from "app/objects/queries/getMainObjects";

export const MainObjectsList: React.FC = () => {
  const [mainObjects] = usePaginatedQuery(getMainObjects, {
    orderBy: { id: "asc" },
  });

  if (mainObjects) {
    return (
      <div>
        <ul>
          {mainObjects.map((mainObject) => (
            <li key={mainObject.number}>{mainObject.number}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <div>Empty</div>;
};

const MainObjectsPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MainObjectsList />
      </Suspense>
    </div>
  );
};

MainObjectsPage.getLayout = (page) => <Layout title="MainObjects">{page}</Layout>;

export default MainObjectsPage;
