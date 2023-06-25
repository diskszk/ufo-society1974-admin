import { forwardRef } from "react";
import { IconButton } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

type Props = React.ComponentPropsWithRef<"input">;

export const ImageUploadForm = forwardRef<HTMLInputElement, Props>(
  function ImageUploadForm({ ...props }, ref) {
    return (
      <div className="album-edit-image__select">
        <span>画像を変更する</span>
        <IconButton
          sx={{
            height: 48,
            width: 48,
            "&:disabled": {
              "& > span": {
                color: "rgba(44, 44, 44, 0.4)",
              },
            },
          }}
        >
          <label htmlFor="upload-image">
            <AddPhotoAlternate fontSize={"large"} />
            <input
              className="display-none"
              type="file"
              id="upload-image"
              name="upload-image"
              accept="image/*"
              {...props}
              ref={ref}
            />
          </label>
        </IconButton>
      </div>
    );
  }
);
