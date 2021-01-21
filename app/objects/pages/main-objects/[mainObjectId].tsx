import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz";
import getMainObject from "app/objects/queries/getMainObject";
import deleteMainObject from "app/objects/mutations/deleteMainObject";

export const MainObject = () => {
  const router = useRouter();
  const mainObjectId = useParam("mainObjectId", "number");
  const [mainObject] = useQuery(getMainObject, { where: { id: mainObjectId } });
  const [deleteMainObjectMutation] = useMutation(deleteMainObject);

  return (
    <div>
      <h1>MainObject {mainObject.id}</h1>
      <pre>{JSON.stringify(mainObject, null, 2)}</pre>

      <Link href={`/objects/${mainObject.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteMainObjectMutation({ where: { id: mainObject.id } });
            router.push("/objects");
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

const ShowMainObjectPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/objects">
          <a>MainObjects</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <MainObject />
      </Suspense>
    </div>
  );
};

ShowMainObjectPage.getLayout = (page) => <Layout title="MainObject">{page}</Layout>;

export default ShowMainObjectPage;
