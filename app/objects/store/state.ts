import { observable } from "mobx";
import { ECheckTypes, ESortingValues } from "../constants";

export const createStore = () => {
  const store = {
    objectNumber: observable.box(""),
    activeObjects: observable.box(false),
    chief: observable.box([] as number[]),
    client: observable.box([] as number[]),
    deputy: observable.box([] as number[]),
    company: observable.box([] as number[]),
    path: observable.box([] as number[]),
    typeCheck: observable.box(ECheckTypes.All),
    reportSorting: observable.box(ESortingValues.CHIEF),
    setObjects: (value: string) => {
      store.objectNumber.set(value);
    },
    setActiveObject: (value: boolean) => {
      store.activeObjects.set(value);
    },
    setChief: (value: number[]) => {
      store.chief.set(value);
    },
    setClient: (value: number[]) => {
      store.client.set(value);
    },
    setDeputy: (value: number[]) => {
      store.deputy.set(value);
    },
    setCompany: (value: number[]) => {
      store.company.set(value);
    },
    setPath: (value: number[]) => {
      store.path.set(value);
    },
    setTypeCheck: (value: ECheckTypes) => {
      store.typeCheck.set(value);
    },
    setReportSorting: (value: ESortingValues) => {
      store.reportSorting.set(value);
    },
    resetState: () => {
      store.objectNumber.set("");
      store.activeObjects.set(false);
      store.chief.set([]);
      store.client.set([]);
      store.deputy.set([]);
      store.company.set([]);
      store.path.set([]);
      store.typeCheck.set(0);
      store.reportSorting.set(ESortingValues.CHIEF);
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
