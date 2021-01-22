import React, { useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { IRow, IHeader, SLIDER_WIDTH } from "app/constants/table";

type THeader = (data: IHeader) => JSX.Element;
type TRow = (data: IRow) => JSX.Element;

interface ITableBody {
  itemCount: number;
  Row: TRow;
  className?: string;
}

interface IVirtualTableBody extends ITableBody {
  cellHeight: number;
}

interface IVirtualTable extends ITableBody {
  Header: THeader;
  containerClassName: string;
  cellHeight: number;
}

const useStyles = makeStyles(() => ({
  "@global": {
    ".cssjss-virtual_table": {
      scrollbarColor: "#cccccc #5f5f5f",
      scrollbarWidth: "thin",
      "&::-webkit-scrollbar": {
        width: SLIDER_WIDTH,
      },
      "&::-webkit-scrollbar-track": {
        background: "#5f5f5f",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#cccccc",
      },
    },
  },
}));

export const VirtualTableBody: React.FC<IVirtualTableBody> = ({
  itemCount,
  Row,
  cellHeight,
  className = "",
}: IVirtualTableBody) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          itemSize={cellHeight}
          itemCount={itemCount}
          className={clsx("cssjss-virtual_table", className)}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};

export const VirtualTable: React.FC<IVirtualTable> = ({
  itemCount,
  Row,
  Header,
  containerClassName,
  className = "",
  cellHeight,
}: IVirtualTable) => {
  useStyles();

  const listRer = useRef<HTMLDivElement | null>(null);
  const [headerMargin, setHeaderMargin] = useState(0);

  useEffect(() => {
    if (listRer.current) {
      const { current } = listRer;
      const viewportHeight = current.clientHeight;
      const dataLength = itemCount * cellHeight;

      if (viewportHeight < dataLength) {
        setHeaderMargin(SLIDER_WIDTH);
      } else {
        setHeaderMargin(0);
      }
    }
  }, [itemCount]);

  return (
    <div className={containerClassName}>
      <Header headerMargin={headerMargin} />
      <div style={{ height: "100%" }} ref={listRer}>
        <VirtualTableBody
          cellHeight={cellHeight}
          itemCount={itemCount}
          Row={Row}
          className={className}
        />
      </div>
    </div>
  );
};
