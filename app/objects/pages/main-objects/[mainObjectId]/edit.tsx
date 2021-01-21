import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz";
import getMainObject from "app/objects/queries/getMainObject";
import updateMainObject from "app/objects/mutations/updateMainObject";
import MainObjectForm from "app/objects/components/MainObjectForm";

export const EditMainObject = () => {
  const router = useRouter();
  const mainObjectId = useParam("mainObjectId", "number");
  const [mainObject, { setQueryData }] = useQuery(getMainObject, { where: { id: mainObjectId } });
  const [updateMainObjectMutation] = useMutation(updateMainObject);

  return (
    <div>
      <h1>Edit MainObject {mainObject.id}</h1>
      <pre>{JSON.stringify(mainObject)}</pre>

      <MainObjectForm
        initialValues={mainObject}
        onSubmit={async () => {
          try {
            const updated = await updateMainObjectMutation({
              where: { id: mainObject.id },
              data: { title: "MyNewName" },
            });
            await setQueryData(updated);
            alert(`Success!${JSON.stringify(updated)}`);
            router.push(`/objects/${updated.id}`);
          } catch (error) {
            console.log(error);
            alert(`Error editing mainObject ${JSON.stringify(error, null, 2)}`);
          }
        }}
      />
    </div>
  );
};

const EditMainObjectPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMainObject />
      </Suspense>

      <p>
        <Link href="/objects">
          <a>MainObjects</a>
        </Link>
      </p>
    </div>
  );
};

EditMainObjectPage.getLayout = (page) => <Layout title="Edit MainObject">{page}</Layout>;

export default EditMainObjectPage;
