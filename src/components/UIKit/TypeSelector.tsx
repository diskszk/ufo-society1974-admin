import { Box, NativeSelect, FormControl, InputLabel } from "@mui/material";

type Props = {
  roles: {
    value: string;
    label: string;
  }[];
  label: string;
  role: string;
  required: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TypeSelector: React.FC<Props> = (props: Props) => {
  return (
    <Box
      sx={{
        margin: "24px auto",
        width: "80%",
      }}
    >
      <FormControl
        required={props.required}
        sx={{
          width: "100%",
        }}
      >
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {props.label}
        </InputLabel>
        <NativeSelect
          variant="standard"
          id="standard-select-currency-native"
          value={props.role}
          inputProps={{
            id: "uncontrolled-native",
          }}
          onChange={props.onChange}
        >
          {props.roles.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default TypeSelector;
