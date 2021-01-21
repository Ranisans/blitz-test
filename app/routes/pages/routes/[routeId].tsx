import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz";
import getRoute from "app/routes/queries/getRoute";
import deleteRoute from "app/routes/mutations/deleteRoute";

export const Route = () => {
  const router = useRouter();
  const routeId = useParam("routeId", "number");
  const [route] = useQuery(getRoute, { where: { id: routeId } });
  const [deleteRouteMutation] = useMutation(deleteRoute);

  return (
    <div>
      <h1>Route {route.id}</h1>
      <pre>{JSON.stringify(route, null, 2)}</pre>

      <Link href={`/routes/${route.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteRouteMutation({ where: { id: route.id } });
            router.push("/routes");
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

const ShowRoutePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/routes">
          <a>Routes</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Route />
      </Suspense>
    </div>
  );
};

ShowRoutePage.getLayout = (page) => <Layout title="Route">{page}</Layout>;

export default ShowRoutePage;
