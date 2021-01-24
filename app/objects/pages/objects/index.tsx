import React, { Suspense } from "react";
import Layout from "app/layouts/Layout";
import { BlitzPage } from "blitz";
import FirstRow from "../../components/FirstRow";
import SecondRow from "../../components/SecondRow";
import ObjectTable from "../../components/ObjectsTable";
import { StoreProvider } from "../../store/context";

import styles from "./index.module.scss";

export const MainObjectsList: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu_container}>
        <FirstRow />
        <SecondRow />
      </div>
      <ObjectTable />
    </div>
  );
};

const MainObjectsPage: BlitzPage = () => {
  return (
    <StoreProvider>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <MainObjectsList />
        </Suspense>
      </div>
    </StoreProvider>
  );
};

MainObjectsPage.getLayout = (page) => <Layout title="MainObjects">{page}</Layout>;

export default MainObjectsPage;
