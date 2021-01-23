import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { SORTING_VALUES } from "../constants";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "end",
    "& > *": {
      marginRight: 5,
    },
  },
  imageButton: {
    padding: theme.spacing(0, 0),
    backgroundColor: "#ccc",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    boxSizing: "border-box",
    maxWidth: 50,
    maxHeight: 50,
    minWidth: 50,
    minHeight: 50,
  },
  excelButton: {
    backgroundImage: `url(/excel-icon.png)`,
  },
  mapButton: {
    backgroundImage: `url(/map-icon.png)`,
  },
}));

const FirstRow: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <FormControl style={{ width: 125 }}>
          <InputLabel htmlFor="objects-sorting_type">Сортировка по</InputLabel>
          <Select
            inputProps={{
              name: "sortingType",
              id: "object_list-sorting_type",
            }}
          >
            {SORTING_VALUES.map((item) => (
              <MenuItem key={item.label} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button aria-label="to excel" className={clsx(styles.imageButton, styles.excelButton)} />
        <Button aria-label="to map" className={clsx(styles.imageButton, styles.mapButton)} />
      </div>
    </div>
  );
};

export default FirstRow;
