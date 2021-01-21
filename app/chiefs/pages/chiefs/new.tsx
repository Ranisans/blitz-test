import React from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useMutation, BlitzPage } from "blitz";
import createChief from "app/chiefs/mutations/createChief";
import ChiefForm from "app/chiefs/components/ChiefForm";

const NewChiefPage: BlitzPage = () => {
  const router = useRouter();
  const [createChiefMutation] = useMutation(createChief);

  return (
    <div>
      <h1>Create New Chief</h1>

      <ChiefForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const chief = await createChiefMutation({ data: { name: "MyName" } });
            alert(`Success!${JSON.stringify(chief)}`);
            router.push(`/chiefs/${chief.id}`);
          } catch (error) {
            alert(`Error creating chief ${JSON.stringify(error, null, 2)}`);
          }
        }}
      />

      <p>
        <Link href="/chiefs">
          <a>Chiefs</a>
        </Link>
      </p>
    </div>
  );
};

NewChiefPage.getLayout = (page) => <Layout title="Create New Chief">{page}</Layout>;

export default NewChiefPage;
