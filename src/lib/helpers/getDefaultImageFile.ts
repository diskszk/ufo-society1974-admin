import { NO_IMAGE } from "../../constants";

export const getDefaultImageFile = (): FileList => {
  const file = new File(["no_image"], NO_IMAGE, { type: "image/jpeg" });
  const dataTransfer = new DataTransfer();

  dataTransfer.items.add(file);
  return dataTransfer.files;
};
