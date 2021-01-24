import React from "react";
import {
  Container,
  FormControl,
  FormControlLabel,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
} from "@material-ui/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// eslint-disable-next-line import/no-extraneous-dependencies
import DateFnsUtils from "@date-io/date-fns";
import clsx from "clsx";
import { CHECK_TYPE } from "../constants";
import GreenButton from "../../components/GreenButton";
import CancelButton from "../../components/CancelButton";
import useStyles from "./objectFormStyles";

const ObjectForm: React.FC = () => {
  const [actualDate, setActualDate] = React.useState(new Date());

  const styles = useStyles();

  return (
    <Container maxWidth={false} disableGutters className={styles.container}>
      <div className={clsx(styles.firstRow, styles.row)}>
        <TextField name="objectNumber" label="№ Объекта" className={styles.noMargin} />
        <FormControlLabel
          control={<TextField contentEditable={false} className={styles.noSelect} />}
          label="Заказчик"
          labelPlacement="top"
        />
        <TextField
          name="title"
          label="Название"
          multiline
          rows={3}
          variant="outlined"
          className={styles.textArea}
        />
        <TextField
          name="address"
          label="Адрес"
          multiline
          rows={3}
          variant="outlined"
          className={styles.textArea}
        />
        <TextField
          name="telephone"
          label="Телефоны"
          multiline
          rows={3}
          variant="outlined"
          className={styles.textArea}
        />
        <div className={styles.postBlock}>
          <FormControlLabel
            control={<TextField name="dayMode" className={styles.numberField} />}
            label="Сутки"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<TextField name="daytimeMode" className={styles.numberField} />}
            label="День"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<TextField name="nightMode" className={styles.numberField} />}
            label="Ночь"
            labelPlacement="start"
          />
        </div>
        <TextField
          label="Режим охраны"
          multiline
          rows={3}
          variant="outlined"
          className={styles.textArea}
        />
      </div>
      <div className={clsx(styles.secondRow, styles.row)}>
        <FormControlLabel
          control={<TextField contentEditable={false} className={styles.noSelect} />}
          label="Нач Охраны"
          labelPlacement="top"
          className={styles.noMargin}
        />
        <FormControlLabel
          control={<TextField contentEditable={false} className={styles.noSelect} />}
          label="Заместитель"
          labelPlacement="top"
        />
        <FormControlLabel
          control={<TextField contentEditable={false} className={styles.noSelect} />}
          label="Маршрут"
          labelPlacement="top"
        />
        <TextField
          name="signal"
          label="Сигнализация"
          variant="outlined"
          className={styles.textArea}
        />
        <FormControlLabel
          control={<TextField contentEditable={false} className={styles.noSelect} />}
          label="ЧОП"
          labelPlacement="top"
        />
        <TextField label="GPS" variant="outlined" className={styles.textArea} />
        <FormControl variant="outlined" className={styles.noMargin}>
          <InputLabel id="check_type_label">Тип Проверки</InputLabel>
          <Select labelId="check_type_label">
            {CHECK_TYPE.map((value) => (
              <MenuItem key={value.id} value={value.id}>
                {value.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={clsx(styles.thirdRow, styles.row)}>
        <Button aria-label="close" variant="contained" color="secondary" />
        <FormControlLabel
          control={<Checkbox color="primary" className={styles.noPadding} />}
          label="Не создавать новый"
          labelPlacement="top"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label="Дата изменения:"
            className={styles.dateField}
            placeholder="01-01-2020"
            disableFuture
            format="dd-MM-yyyy"
            value={actualDate}
            onChange={(date) => setActualDate(date as Date)}
          />
        </MuiPickersUtilsProvider>
        <GreenButton aria-label="write" variant="contained">
          Записать
        </GreenButton>
        <CancelButton aria-label="cancel" variant="contained">
          Отмена
        </CancelButton>
      </div>
    </Container>
  );
};

export default ObjectForm;
