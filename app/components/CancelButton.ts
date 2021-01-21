import { Button } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";

const CancelButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    "&:hover": {
      backgroundColor: yellow[700],
    },
  },
}))(Button);

export default CancelButton;
