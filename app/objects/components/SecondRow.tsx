import React, { useState } from "react";
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
import { observer } from "mobx-react-lite";
import { CHECK_TYPES } from "../constants";
import CancelButton from "../../components/CancelButton";
import { storeContext } from "../store/context";

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

const SecondRow: React.FC = observer(() => {
  const styles = useStyles();
  const store = React.useContext(storeContext);
  if (!store) throw Error("Store shouldn't be null");
  const { setObjects, activeObjects, setActiveObject, typeCheck, setTypeCheck, resetState } = store;

  const [objectNumbers, setObjectNumbers] = useState("");

  const handleObjectsChange = (event: React.ChangeEvent<{ value: string }>) => {
    setObjectNumbers(event.target.value);
  };

  const handleObjectsKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setObjects(objectNumbers);
    }
  };

  const handleActiveCObjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveObject(event.target.checked);
  };

  const handleCheckTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number;
    setTypeCheck(value);
  };

  const handleReset = () => {
    setObjectNumbers("");
    resetState();
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <p>Фильтр:</p>
        <TextField
          label="№№ Объектов"
          value={objectNumbers}
          onChange={handleObjectsChange}
          onKeyPress={handleObjectsKeyPress}
        />
        <FormControlLabel
          value="activeObjects"
          control={
            <Checkbox
              color="primary"
              checked={activeObjects.get()}
              onChange={handleActiveCObjectChange}
            />
          }
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
          <Select id="objects-check_type" value={typeCheck.get()} onChange={handleCheckTypeChange}>
            {CHECK_TYPES.map((item) => (
              <MenuItem key={item.label} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <CancelButton className={styles.choiceButton} onClick={handleReset}>
          Отмена
        </CancelButton>
      </div>
    </div>
  );
});

export default SecondRow;
