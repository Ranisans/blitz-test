import React from "react";
import { useLocalObservable } from "mobx-react-lite";

import { createStore, TStore } from "./state";
import { IStoreProvider } from "../../constants";

export const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider: React.FC<IStoreProvider> = ({ children }: IStoreProvider) => {
  const store = useLocalObservable(createStore);

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};
