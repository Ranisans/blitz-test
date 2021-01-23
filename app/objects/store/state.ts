import { ECheckTypes, ESortingValues } from "../constants";

export const createStore = () => {
  const store = {
    objectNumber: "",
    activeObjects: false,
    chief: [] as number[],
    client: [] as number[],
    deputy: [] as number[],
    company: [] as number[],
    path: [] as number[],
    typeCheck: ECheckTypes.All,
    reportSorting: ESortingValues.CHIEF,
    setObjects: (value: string) => {
      store.objectNumber = value;
    },
    setActiveObject: (value: boolean) => {
      store.activeObjects = value;
    },
    setChief: (value: number[]) => {
      store.chief = value;
    },
    setClient: (value: number[]) => {
      store.client = value;
    },
    setDeputy: (value: number[]) => {
      store.deputy = value;
    },
    setCompany: (value: number[]) => {
      store.company = value;
    },
    setPath: (value: number[]) => {
      store.path = value;
    },
    setTypeCheck: (value: ECheckTypes) => {
      store.typeCheck = value;
    },
    setReportSorting: (value: number) => {
      store.reportSorting = value;
    },
    resetState: () => {
      store.objectNumber = "";
      store.activeObjects = false;
      store.chief = [];
      store.client = [];
      store.deputy = [];
      store.company = [];
      store.path = [];
      store.typeCheck = 0;
      store.reportSorting = 1;
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
