import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz";
import getDeputy from "app/deputies/queries/getDeputy";
import updateDeputy from "app/deputies/mutations/updateDeputy";
import DeputyForm from "app/deputies/components/DeputyForm";

export const EditDeputy = () => {
  const router = useRouter();
  const deputyId = useParam("deputyId", "number");
  const [deputy, { setQueryData }] = useQuery(getDeputy, { where: { id: deputyId } });
  const [updateDeputyMutation] = useMutation(updateDeputy);

  return (
    <div>
      <h1>Edit Deputy {deputy.id}</h1>
      <pre>{JSON.stringify(deputy)}</pre>

      <DeputyForm
        initialValues={deputy}
        onSubmit={async () => {
          try {
            const updated = await updateDeputyMutation({
              where: { id: deputy.id },
              data: { name: "MyNewName" },
            });
            await setQueryData(updated);
            alert(`Success!${JSON.stringify(updated)}`);
            router.push(`/deputies/${updated.id}`);
          } catch (error) {
            console.log(error);
            alert(`Error editing deputy ${JSON.stringify(error, null, 2)}`);
          }
        }}
      />
    </div>
  );
};

const EditDeputyPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditDeputy />
      </Suspense>

      <p>
        <Link href="/deputies">
          <a>Deputies</a>
        </Link>
      </p>
    </div>
  );
};

EditDeputyPage.getLayout = (page) => <Layout title="Edit Deputy">{page}</Layout>;

export default EditDeputyPage;
