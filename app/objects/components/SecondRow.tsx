import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import clsx from "clsx";
import { CHECK_TYPES } from "../constants";
import CancelButton from "../../components/CancelButton";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    "@media (max-width: 1205px)": {
      display: "block",
    },
  },
  block: {
    display: "flex",
    alignItems: "end",
    gridGap: 5,
  },
  checkBox: {
    "& span": {
      padding: 0,
    },
  },
  rightBlock: {
    justifyContent: "flex-end",
  },
  choiceButton: {
    fontSize: "0.8rem",
    height: 40,
  },
  selectionBox: {
    width: 130,
  },
}));

const SecondRow: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <p>Фильтр:</p>
        <TextField label="№№ Объектов" />
        <FormControlLabel
          value="activeObjects"
          control={<Checkbox color="primary" />}
          label="Действующие"
          labelPlacement="top"
          className={styles.checkBox}
        />
      </div>
      <div className={clsx(styles.block, styles.rightBlock)}>
        <Button variant="contained" color="primary" className={styles.choiceButton}>
          Нач.Охр.
        </Button>
        <Button variant="contained" color="primary" className={styles.choiceButton}>
          Заказчики
        </Button>
        <Button variant="contained" color="primary" className={styles.choiceButton}>
          Заместители
        </Button>
        <Button variant="contained" color="primary" className={styles.choiceButton}>
          ЧОП
        </Button>
        <Button variant="contained" color="primary" className={styles.choiceButton}>
          Маршруты
        </Button>
        <FormControl className={styles.selectionBox}>
          <InputLabel htmlFor="objects-check_type">Тип проверки</InputLabel>
          <Select id="objects-check_type">
            {CHECK_TYPES.map((item) => (
              <MenuItem key={item.label} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <CancelButton className={styles.choiceButton}>Отмена</CancelButton>
      </div>
    </div>
  );
};

export default SecondRow;
