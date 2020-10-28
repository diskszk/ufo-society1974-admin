import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

type Props = {
  roles: {
    value: string;
    label: string;
  }[];
  label: string;
  role: string;
  required: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useSrtyles = makeStyles({
  selector: {
    margin: "1.5em 0",
    width: "40em"
  }
})

const TypeSelector = (props: Props) => {

  const classes = useSrtyles();

  return (
    <TextField
      className={classes.selector}
      id="standard-select-currency-native"
      select
      label={props.label}
      value={props.role}
      onChange={props.onChange}
      required={props.required}
      SelectProps={{
        native: true,
      }}
    >
      {props.roles.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
}

export default TypeSelector;