import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz";
import getChief from "app/chiefs/queries/getChief";
import updateChief from "app/chiefs/mutations/updateChief";
import ChiefForm from "app/chiefs/components/ChiefForm";

export const EditChief = () => {
  const router = useRouter();
  const chiefId = useParam("chiefId", "number");
  const [chief, { setQueryData }] = useQuery(getChief, { where: { id: chiefId } });
  const [updateChiefMutation] = useMutation(updateChief);

  return (
    <div>
      <h1>Edit Chief {chief.id}</h1>
      <pre>{JSON.stringify(chief)}</pre>

      <ChiefForm
        initialValues={chief}
        onSubmit={async () => {
          try {
            const updated = await updateChiefMutation({
              where: { id: chief.id },
              data: { name: "MyNewName" },
            });
            await setQueryData(updated);
            alert(`Success!${JSON.stringify(updated)}`);
            router.push(`/chiefs/${updated.id}`);
          } catch (error) {
            console.log(error);
            alert(`Error editing chief ${JSON.stringify(error, null, 2)}`);
          }
        }}
      />
    </div>
  );
};

const EditChiefPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditChief />
      </Suspense>

      <p>
        <Link href="/chiefs">
          <a>Chiefs</a>
        </Link>
      </p>
    </div>
  );
};

EditChiefPage.getLayout = (page) => <Layout title="Edit Chief">{page}</Layout>;

export default EditChiefPage;
