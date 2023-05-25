import { TextField } from "@mui/material";

type Props = {
  roles: {
    value: string;
    label: string;
  }[];
  label: string;
  role: string;
  required: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TypeSelector: React.FC<Props> = (props: Props) => {
  return (
    <TextField
      sx={{
        margin: "1.5em 0",
        width: "80%",
      }}
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
};

export default TypeSelector;
