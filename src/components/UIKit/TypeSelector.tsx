import {
  NativeSelectProps,
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";

type Props = {
  options: { label: string; value: string }[];
};
export const TypeSelector: React.FC<Props & NativeSelectProps> = ({
  options,
  ...nativeSelectProps
}) => (
  <Box
    sx={{
      margin: "24px auto",
      width: "80%",
    }}
  >
    <FormControl
      sx={{
        width: "100%",
      }}
    >
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {"役職"}
      </InputLabel>
      <NativeSelect
        {...nativeSelectProps}
        variant="standard"
        id="standard-select-currency-native"
        inputProps={{
          id: "uncontrolled-native",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  </Box>
);
