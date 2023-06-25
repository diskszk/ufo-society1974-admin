import {
  NativeSelectProps,
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { ComponentPropsWithRef, forwardRef } from "react";
import { SelectOptions } from "../../lib/types";

type SelectProps = ComponentPropsWithRef<"div"> &
  NativeSelectProps & {
    options: SelectOptions;
  };

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  { options, ...props },
  ref
) {
  return (
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
          {...props}
          variant="standard"
          id="standard-select-currency-native"
          inputProps={{
            id: "uncontrolled-native",
          }}
          ref={ref}
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
});
