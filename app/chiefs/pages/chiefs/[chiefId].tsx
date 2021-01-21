import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz";
import getChief from "app/chiefs/queries/getChief";
import deleteChief from "app/chiefs/mutations/deleteChief";

export const Chief = () => {
  const router = useRouter();
  const chiefId = useParam("chiefId", "number");
  const [chief] = useQuery(getChief, { where: { id: chiefId } });
  const [deleteChiefMutation] = useMutation(deleteChief);

  return (
    <div>
      <h1>Chief {chief.id}</h1>
      <pre>{JSON.stringify(chief, null, 2)}</pre>

      <Link href={`/chiefs/${chief.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteChiefMutation({ where: { id: chief.id } });
            router.push("/chiefs");
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

const ShowChiefPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/chiefs">
          <a>Chiefs</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Chief />
      </Suspense>
    </div>
  );
};

ShowChiefPage.getLayout = (page) => <Layout title="Chief">{page}</Layout>;

export default ShowChiefPage;
