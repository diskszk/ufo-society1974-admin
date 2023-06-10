import { forwardRef } from "react";
import { TextFieldProps, TextField } from "@mui/material";

type Props = React.ComponentPropsWithRef<"input"> & TextFieldProps;

/* 
  react-hook-formと連携できるmuiのinputコンポーネント
*/
export const Textbox = forwardRef<HTMLInputElement, Props>(function Textbox(
  { ...props },
  ref
) {
  return (
    <TextField
      sx={{
        margin: "1.5em 0",
        width: "80%",
      }}
      type="text"
      defaultValue=""
      {...props}
      ref={ref}
    />
  );
});
