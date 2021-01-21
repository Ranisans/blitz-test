import React from "react";
import Layout from "app/layouts/Layout";
import { Link, useRouter, useMutation, BlitzPage } from "blitz";
import createDeputy from "app/deputies/mutations/createDeputy";
import DeputyForm from "app/deputies/components/DeputyForm";

const NewDeputyPage: BlitzPage = () => {
  const router = useRouter();
  const [createDeputyMutation] = useMutation(createDeputy);

  return (
    <div>
      <h1>Create New Deputy</h1>

      <DeputyForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const deputy = await createDeputyMutation({ data: { name: "MyName" } });
            alert(`Success!${JSON.stringify(deputy)}`);
            router.push(`/deputies/${deputy.id}`);
          } catch (error) {
            alert(`Error creating deputy ${JSON.stringify(error, null, 2)}`);
          }
        }}
      />

      <p>
        <Link href="/deputies">
          <a>Deputies</a>
        </Link>
      </p>
    </div>
  );
};

NewDeputyPage.getLayout = (page) => <Layout title="Create New Deputy">{page}</Layout>;

export default NewDeputyPage;
