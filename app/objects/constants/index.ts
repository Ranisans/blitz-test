export enum ESortingValues {
  CHIEF = 1,
  DEPUTY,
  COMPANY,
  PATH,
}

export const SORTING_VALUES = [
  { label: "Нач. Охраны", value: ESortingValues.CHIEF },
  { label: "Заместители", value: ESortingValues.DEPUTY },
  { label: "ЧОПы", value: ESortingValues.COMPANY },
  { label: "Маршруты", value: ESortingValues.PATH },
];

export enum ECheckTypes {
  All,
  USUAL,
  BY_ORDER,
}

export const CHECK_TYPES = [
  { label: "Все", value: ECheckTypes.All },
  { label: "Обычная", value: ECheckTypes.USUAL },
  { label: "По указанию", value: ECheckTypes.BY_ORDER },
];

export interface IColumn {
  label: string;
  dataKey: string;
}

export const COLUMNS: IColumn[] = [
  {
    label: "№",
    dataKey: "number",
  },
  {
    label: "Заказчик",
    dataKey: "client",
  },
  {
    label: "Тип",
    dataKey: "title",
  },
  {
    label: "Адрес",
    dataKey: "address",
  },
  {
    label: "Телефоны",
    dataKey: "telephones",
  },
  {
    label: "Режим",
    dataKey: "mode",
  },
  {
    label: "Нач Охраны",
    dataKey: "chief",
  },
  {
    label: "Зам",
    dataKey: "deputy",
  },
  {
    label: "Сигнал",
    dataKey: "signal",
  },
  {
    label: "Маршрут",
    dataKey: "route",
  },
  {
    label: "ЧОП",
    dataKey: "company",
  },
];

interface IDirectoryRecord {
  name: string;
}

export const HEADER_HEIGHT = 40;
export const CELL_HEIGHT = 40;

export interface IObject {
  number: string;
  title: string;
  client: IDirectoryRecord;
  address: string;
  telephones: string;
  mode: string;
  signal: string;
  chief: IDirectoryRecord;
  deputy: IDirectoryRecord;
  route: IDirectoryRecord;
  gps: string;
  company: IDirectoryRecord;
  typeCheck: number;
  dayMode: number;
  dayTimeMode: number;
  nightMode: number;
  opened: boolean;
}

export const TYPE_CHECK = [
  { label: "Обычная", id: 0 },
  { label: "По указанию", id: 1 },
];
