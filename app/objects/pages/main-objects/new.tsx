import React from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useMutation, BlitzPage } from "blitz";
import createMainObject from "app/objects/mutations/createMainObject";
import MainObjectForm from "app/objects/components/MainObjectForm";

const NewMainObjectPage: BlitzPage = () => {
  const router = useRouter();
  const [createMainObjectMutation] = useMutation(createMainObject);

  return (
    <div>
      <h1>Create New MainObject</h1>

      <MainObjectForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            // const mainObject = await createMainObjectMutation({ data: { title: "MyName" } });
            // alert(`Success!${JSON.stringify(mainObject)}`);
            // router.push(`/objects/${mainObject.id}`);
          } catch (error) {
            alert(`Error creating mainObject ${JSON.stringify(error, null, 2)}`);
          }
        }}
      />

      <p>
        <Link href="/objects">
          <a>MainObjects</a>
        </Link>
      </p>
    </div>
  );
};

NewMainObjectPage.getLayout = (page) => <Layout title="Create New MainObject">{page}</Layout>;

export default NewMainObjectPage;
