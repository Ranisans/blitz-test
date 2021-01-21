import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz";
import getRoute from "app/routes/queries/getRoute";
import updateRoute from "app/routes/mutations/updateRoute";
import RouteForm from "app/routes/components/RouteForm";

export const EditRoute = () => {
  const router = useRouter();
  const routeId = useParam("routeId", "number");
  const [route, { setQueryData }] = useQuery(getRoute, { where: { id: routeId } });
  const [updateRouteMutation] = useMutation(updateRoute);

  return (
    <div>
      <h1>Edit Route {route.id}</h1>
      <pre>{JSON.stringify(route)}</pre>

      <RouteForm
        initialValues={route}
        onSubmit={async () => {
          try {
            const updated = await updateRouteMutation({
              where: { id: route.id },
              data: { name: "MyNewName" },
            });
            await setQueryData(updated);
            alert(`Success!${JSON.stringify(updated)}`);
            router.push(`/routes/${updated.id}`);
          } catch (error) {
            console.log(error);
            alert(`Error editing route ${JSON.stringify(error, null, 2)}`);
          }
        }}
      />
    </div>
  );
};

const EditRoutePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRoute />
      </Suspense>

      <p>
        <Link href="/routes">
          <a>Routes</a>
        </Link>
      </p>
    </div>
  );
};

EditRoutePage.getLayout = (page) => <Layout title="Edit Route">{page}</Layout>;

export default EditRoutePage;
