import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz";
import getDeputy from "app/deputies/queries/getDeputy";
import deleteDeputy from "app/deputies/mutations/deleteDeputy";

export const Deputy = () => {
  const router = useRouter();
  const deputyId = useParam("deputyId", "number");
  const [deputy] = useQuery(getDeputy, { where: { id: deputyId } });
  const [deleteDeputyMutation] = useMutation(deleteDeputy);

  return (
    <div>
      <h1>Deputy {deputy.id}</h1>
      <pre>{JSON.stringify(deputy, null, 2)}</pre>

      <Link href={`/deputies/${deputy.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteDeputyMutation({ where: { id: deputy.id } });
            router.push("/deputies");
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

const ShowDeputyPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/deputies">
          <a>Deputies</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Deputy />
      </Suspense>
    </div>
  );
};

ShowDeputyPage.getLayout = (page) => <Layout title="Deputy">{page}</Layout>;

export default ShowDeputyPage;
