import { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlbumInput, albumSchema } from "../../lib/schemas/albumSchema";

import { Textbox } from "../../components/Textbox";
import { ImageUploadForm } from "../ImageUploadForm";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { getDefaultImageFile } from "../../lib/helpers/getDefaultImageFile";
import { NO_IMAGE, ROLE } from "../../constants";

type Props = {
  backToHref: string;
  onSubmit: SubmitHandler<AlbumInput>;
  role: string;
};

export const AlbumForm: React.FC<Props> = ({ backToHref, onSubmit, role }) => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful, isSubmitting },
  } = useForm<AlbumInput>({
    resolver: zodResolver(albumSchema),
    mode: "onBlur",
    defaultValues: {
      imageFile: getDefaultImageFile(),
    },
  });

  const [previewImageSrc, setPreviewImageSrc] = useState(NO_IMAGE);

  // 画像が挿入されたらpreview画像を更新する
  const watchImageFile = watch("imageFile");

  useEffect(() => {
    const file = watchImageFile.item(0) as File;

    setPreviewImageSrc(URL.createObjectURL(file));
  }, [watchImageFile]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const isApprovedUser = role === ROLE.EDITOR;

  return (
    <div className="inputs-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textbox
          {...register("title")}
          label={"アルバムタイトル"}
          type="text"
          required
          error={!!errors?.title}
          helperText={errors?.title?.message}
          aria-invalid={errors?.title ? true : false}
          variant="standard"
        />

        <div className="album-edit-image">
          <ImageUploadForm {...register("imageFile")} />

          <img
            src={previewImageSrc}
            alt={`アルバムのイメージ`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = NO_IMAGE;
            }}
          />
        </div>
        <div className="spacing-div" />

        <Textbox
          {...register("publishedDate")}
          label="公開日(YYYY-MM-DD)"
          type="text"
          required
          error={!!errors?.publishedDate}
          helperText={errors?.publishedDate?.message}
          aria-invalid={errors?.publishedDate ? true : false}
          variant="standard"
        />

        <div className="button-container-row">
          <StyledButton href={backToHref}>もどる</StyledButton>

          <StyledButton
            disabled={isSubmitting || (isApprovedUser && !isDirty)}
            type="submit"
          >
            保存する
          </StyledButton>
        </div>
      </form>
    </div>
  );
};
