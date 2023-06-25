import { AlbumInput } from "../../lib/schemas/albumSchema";
import { useMutation } from "@tanstack/react-query";
import {
  CreateAlbumDTO,
  createAlbum,
  uploadImageFile,
} from "../../lib/albums/createAlbum";
import { ERROR_MESSAGE } from "../../constants";
import { useCallback } from "react";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { v4 as uuid } from "uuid";

export function useCreateAlbum() {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutateAsync: uploadImageFileMutate } = useMutation(
    ({ formData, filename }: { formData: FormData; filename: string }) =>
      uploadImageFile(formData, filename)
  );

  const { mutateAsync: createAlbumMutate } = useMutation(
    (album: CreateAlbumDTO) => createAlbum(album)
  );

  const handleCreateAlbum = useCallback(
    async (data: AlbumInput) => {
      const imageFile = data.imageFile.item(0) as File;

      const formData = new FormData();

      formData.append("imageFile", imageFile);

      try {
        const filename = uuid();
        const imageFile = await uploadImageFileMutate({ formData, filename });

        if (!imageFile) {
          throw new Error(ERROR_MESSAGE.serverError);
        }

        await createAlbumMutate({ ...data, imageFile });
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [createAlbumMutate, openMessageModalWithMessage, uploadImageFileMutate]
  );

  return { handleCreateAlbum };
}
