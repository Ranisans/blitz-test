import { withStyles } from "@material-ui/core/styles";
import { TextField } from "mui-rff";

const INPUT_COLOR = "#9D9C9C";

const LightTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: INPUT_COLOR,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: INPUT_COLOR,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: INPUT_COLOR,
      },
      "&:hover fieldset": {
        borderColor: INPUT_COLOR,
      },
      "&.Mui-focused fieldset": {
        borderColor: INPUT_COLOR,
      },
    },
    "& .MuiInputBase-input": {
      color: INPUT_COLOR,
    },
    "& .MuiInputLabel-root": {
      color: INPUT_COLOR,
    },
  },
})(TextField);

export default LightTextField;
