import { Theme, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";

const GreenButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

export default GreenButton;
