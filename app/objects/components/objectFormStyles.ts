import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "grid",
    gridTemplateRows: "repeat(3, auto)",
    width: 1250,
  },
  row: {
    marginTop: 10,
    width: "100%",
  },
  firstRow: {
    display: "grid",
    gridTemplateColumns: "95px 190px 130px 220px 170px 105px 170px",
    height: 96,
    gridGap: 3,
    alignItems: "end",
  },
  secondRow: {
    display: "grid",
    gridTemplateColumns: "200px 200px 150px 150px 170px 200px 150px",
    height: 60,
    gridGap: 3,
    alignItems: "end",
  },
  thirdRow: {
    display: "grid",
    gridTemplateColumns: "110px 200px 1fr 110px 110px",
    gridGap: 5,
    alignItems: "end",
    justifyItems: "right",
  },
  noSelect: {
    "& .MuiInputBase-input": {
      userSelect: "none",
      textAlign: "center",
      color: "transparent",
      textShadow: `0 0 0 gray`,
      backgroundColor: "white",
    },
    "& .MuiInput-underline": {
      "&:after": {
        borderBottom: "initial",
      },
    },
  },
  numberField: {
    "& .MuiInputBase-input": {
      textAlign: "end",
    },
  },
  textArea: {
    "& .MuiOutlinedInput-multiline": {
      padding: 6,
    },
  },
  noMargin: {
    margin: 0,
  },
  noPadding: {
    padding: 0,
  },
  postBlock: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 5,
    paddingRight: 5,
    "& .MuiInputBase-input": {
      paddingLeft: 5,
      paddingRight: 5,
    },
    "& .MuiFormControlLabel-labelPlacementStart": {
      margin: 0,
    },
  },
  dateField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
}));

export default useStyles;
