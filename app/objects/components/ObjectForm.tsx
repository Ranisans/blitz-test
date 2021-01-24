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
import { CHECK_TYPE } from "../constants";
import GreenButton from "../../components/GreenButton";
import CancelButton from "../../components/CancelButton";

const ObjectForm: React.FC = () => {
  const [actualDate, setActualDate] = React.useState(new Date());

  return (
    <Container maxWidth={false} disableGutters>
      <div>
        <TextField name="objectNumber" label="№ Объекта" />
        <FormControlLabel
          control={<TextField contentEditable={false} />}
          label="Заказчик"
          labelPlacement="top"
        />
        <TextField name="title" label="Название" multiline rows={3} variant="outlined" />
        <TextField name="address" label="Адрес" multiline rows={3} variant="outlined" />
        <TextField name="telephone" label="Телефоны" multiline rows={3} variant="outlined" />
        <div>
          <FormControlLabel
            control={<TextField name="dayMode" />}
            label="Сутки"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<TextField name="daytimeMode" />}
            label="День"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<TextField name="nightMode" />}
            label="Ночь"
            labelPlacement="start"
          />
        </div>
        <TextField label="Режим охраны" multiline rows={3} variant="outlined" />
      </div>
      <div>
        <FormControlLabel
          control={<TextField contentEditable={false} />}
          label="Нач Охраны"
          labelPlacement="top"
        />
        <FormControlLabel
          control={<TextField contentEditable={false} />}
          label="Заместитель"
          labelPlacement="top"
        />
        <FormControlLabel
          control={<TextField contentEditable={false} />}
          label="Маршрут"
          labelPlacement="top"
        />
        <TextField name="signal" label="Сигнализация" variant="outlined" />
        <FormControlLabel
          control={<TextField contentEditable={false} />}
          label="ЧОП"
          labelPlacement="top"
        />
        <FormControl variant="outlined">
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
      <div>
        <Button aria-label="close" variant="contained" color="secondary" />
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Не создавать новый"
          labelPlacement="top"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label="Дата изменения:"
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
