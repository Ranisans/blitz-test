import React from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useMutation, BlitzPage } from "blitz";
import createRoute from "app/routes/mutations/createRoute";
import RouteForm from "app/routes/components/RouteForm";

const NewRoutePage: BlitzPage = () => {
  const router = useRouter();
  const [createRouteMutation] = useMutation(createRoute);

  return (
    <div>
      <h1>Create New Route</h1>

      <RouteForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const route = await createRouteMutation({ data: { name: "MyName" } });
            alert(`Success!${JSON.stringify(route)}`);
            router.push(`/routes/${route.id}`);
          } catch (error) {
            alert(`Error creating route ${JSON.stringify(error, null, 2)}`);
          }
        }}
      />

      <p>
        <Link href="/routes">
          <a>Routes</a>
        </Link>
      </p>
    </div>
  );
};

NewRoutePage.getLayout = (page) => <Layout title="Create New Route">{page}</Layout>;

export default NewRoutePage;
