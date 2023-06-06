import { TextField, TextFieldProps } from "@mui/material";

type Props = {
  fullWidth: boolean;
  label: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<Props> = (props: Props) => {
  return (
    <TextField
      sx={{
        margin: "1.5em 0",
        width: "80%",
      }}
      margin="dense"
      variant="standard"
      fullWidth={props.fullWidth}
      label={props.label}
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

export const StyledTextField: React.FC<TextFieldProps> = (props) => (
  <TextField
    sx={{
      margin: "1.5em 0",
      width: "80%",
    }}
    {...props}
  />
);
