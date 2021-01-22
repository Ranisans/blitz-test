import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { IHeader, IRow } from "../../constants/table";
import { CELL_HEIGHT, COLUMNS, HEADER_HEIGHT, IObject, TYPE_CHECK } from "../constants";
import { VirtualTable } from "../../components/VirtualTable";

// plug
const data: IObject[] = [];

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "grid",
    gridTemplateRows: `auto 1fr`,
    height: "100%",
    boxSizing: "border-box",
    borderTop: "1px solid gray",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns:
      "45px 140px 65px minmax(150px, 1fr) minmax(150px, 1fr) 105px 125px 70px 65px 80px 75px", // minmax repeat
  },
  headerRow: {
    backgroundColor: "#afafaf",
  },
  tableCell: {
    borderRight: "1px solid gray",
    padding: theme.spacing(0, 1),
    wordWrap: "break-word",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  headerCell: {
    height: HEADER_HEIGHT,
  },
  bodyCell: {
    height: CELL_HEIGHT,
  },
  base: {
    backgroundColor: "#c9d2d0",
  },
  spec: {
    backgroundColor: "#3b9e3b",
  },
  empty: {
    backgroundColor: "#f59c21",
  },
}));

const ObjectTable: React.FC = () => {
  const styles = useStyles();

  const getRowClassName = (index: number): string => {
    const { opened, typeCheck } = data[index];
    let rowClass: string;
    if (!opened) {
      rowClass = styles.empty;
    } else if (typeCheck === TYPE_CHECK[1].id) {
      rowClass = styles.spec;
    } else {
      rowClass = styles.base;
    }
    return `${styles.tableRow} ${rowClass}`;
  };

  const Header = ({ headerMargin }: IHeader) => (
    <TableRow
      component="div"
      style={{ marginRight: headerMargin }}
      className={clsx(styles.tableRow, styles.headerRow)}
    >
      {COLUMNS.map((column) => (
        <TableCell
          component="div"
          variant="head"
          align="left"
          key={column.label}
          className={clsx(styles.tableCell, styles.headerCell)}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const Row = ({ index, style }: IRow) => (
    <TableRow component="div" style={style} className={getRowClassName(index)}>
      {COLUMNS.map((column) => (
        <TableCell
          component="div"
          variant="body"
          align="left"
          key={column.dataKey}
          className={clsx(styles.tableCell, styles.bodyCell)}
        >
          {data[index][column.dataKey]}
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <VirtualTable
      itemCount={data.length}
      Row={Row}
      Header={Header}
      cellHeight={CELL_HEIGHT}
      containerClassName={styles.container}
    />
  );
};

export default ObjectTable;
