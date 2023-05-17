import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";

type Props = {
  fullWidth: boolean;
  label: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const useStyles = makeStyles({
  input: {
    margin: "1.5em 0",
    width: "80%",
  },
});

const TextInput: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.input}
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  );
};

export default TextInput;
